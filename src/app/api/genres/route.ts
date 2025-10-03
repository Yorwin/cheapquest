//Obtener información generos. 

const API_KEY = process.env.RAWG_API_KEY;

export async function GET() {
    try {
        const response = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`, {
            next: {
                revalidate: 604800,
                tags: ["games-available-genres"]
            }
        });

        if (!response.ok) {
            throw new Error("Error al obtener los usuarios externos");
        }

        const genres = await response.json();

        const orderedGenres = genres.results.map((e: any) => {
            return {
                id: e.id,
                name: e.name,
                slug: e.slug,
            }
        });

        orderedGenres.unshift({
            id: null,
            name: "Cualquiera",
            slug: "",
        });

        console.log(orderedGenres);

        return new Response(JSON.stringify(orderedGenres), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });

    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido en el servidor';

        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }
};