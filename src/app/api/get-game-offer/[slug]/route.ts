/* app/api/get-game-offer/[slug]/route.ts */

import { cachedCheapSharkFetch } from "@/lib/api-cache-server";

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

        // Use cached CheapShark fetch
        const data = await cachedCheapSharkFetch('/deals', {
            title: slug,
            exact: 1
        });

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