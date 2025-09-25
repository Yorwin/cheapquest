import "server-only";

const API_KEY = process.env.RAWG_API_KEY;

export const searchForGenres = async () => {

    const request = await fetch(`https://api.rawg.io/api/genres?key=${API_KEY}`, {
        next: {
            revalidate: 604800,
            tags: ["games-available-genres"]
        }
    });

    if(!request.ok) {
        console.error(`Ha ocurrido un error, codigo del error ${request.statusText} ${request.status}`);
        throw new Error("Ha ocurrido un error al intentar obtener los generos disponibles");
    }

    const res = await request.json();

    const orderedGenres = res.results.map((e: any) => {
        return {
            id: e.id,
            name: e.name,
            slug: e.slug,
        }
    }); 

    orderedGenres.unshift({
        id: null,
        name: "Cualquiera",
        slug: "cualquiera",
    });

    return orderedGenres;
};

