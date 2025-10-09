/* app/api/get-game-offer/[slug]/route.ts */

export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return Response.json(
                { error: "Falta el parámetro 'slug'" },
                { status: 400 }
            );
        }

        const cleanGameNameForTag = slug.toLowerCase().replace(/[^a-z0-9]/g, "-");

        const response = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(slug)}&exact=1`,
            {
                next: {
                    revalidate: 1800,
                    tags: [
                        'game-deals',
                        `deal-${cleanGameNameForTag}`,
                        'cheapshark-api'
                    ],
                }
            }
        );

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Rate limited by CheapShark API");
            }
            throw new Error(
                `CheapShark API Error: ${response.status} - ${response.statusText}`
            );
        }

        const data = await response.json();

        // CheapShark retorna un array directamente
        // Lo envolvemos en un objeto para consistencia
        return Response.json({ deals: data }, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Error desconocido en el servidor";
        console.error("Error en /api/get-game-offer/[slug]:", message);

        return Response.json(
            { error: message, deals: [] },
            { status: 500 }
        );
    }
}