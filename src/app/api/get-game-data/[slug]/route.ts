/* Obten Información Videojuego */
/* app/api/get-game-data/[slug]/route.ts */

const API_KEY = process.env.RAWG_API_KEY;

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        const { slug } = params;

        if (!slug) {
            return Response.json(
                { error: "Falta el parámetro 'slug'" },
                { status: 400 }
            );
        }

        const response = await fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(slug)}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch data from RAWG (${response.status})`);
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            return Response.json(
                { header: null, screenshots: [] },
                { status: 200 }
            );
        }

        const headerImage = data.results[0].background_image;
        const screenshots = data.results[0].short_screenshots;

        const dataResult = {
            header: headerImage,
            screenshots: screenshots,
        };

        return Response.json(dataResult, { status: 200 });

    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Error desconocido en el servidor";
        console.error("Error en /api/get-game-data/[slug]:", message);

        return Response.json(
            { error: message },
            { status: 500 }
        );
    }
}
