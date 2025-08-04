import "server-only";
import { getThreeYearsDateRange, calculatePopularityScore, removeDuplicatesByBestPrice } from "@/functions/functions"
import { searchOffers } from "./getMostPopularOffers";

const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

export const getMostPopularGame = async () => {

    const wantedMetacritic = "80,100"

    const res = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&metacritic=${wantedMetacritic}&ordering=-metacritic&dates=${getThreeYearsDateRange()}&page_size=40`, {
        cache: 'default'
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const gamesArray: any[] = [];

    data.results.forEach((e: any) => {
        let gameInfo = {
            game: e.slug,
            id: e.id,
            backgroundImage: e.background_image,
            score: calculatePopularityScore(e)
        }

        gamesArray.push(gameInfo);
    })

    const bestGame = gamesArray.reduce((prev, current) => {
        return current.score > prev.score ? current : prev;
    });

    return bestGame;
};

export const getAgedLikeWineGames = async () => {
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
        .toISOString().split('T')[0]; // Formato YYYY-MM-DD

    let agedLikeWineGames: any[] = [];
    let page = 1;
    const targetCount = 10; // Número mínimo de juegos que queremos
    const maxPages = 5; // Límite de seguridad para evitar bucles infinitos

    while (agedLikeWineGames.length < targetCount && page <= maxPages) {
        console.log(`Buscando en página ${page}... Actualmente tenemos ${agedLikeWineGames.length} juegos`);

        const response = await fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}&dates=1900-01-01,${fiveYearsAgo}&ordering=-rating&page_size=60&platforms=1&metacritic=80,100&page=${page}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(`Error when trying to look for the old games on page ${page}`);
        }

        const data = await response.json();
        const result = data.results;

        // Si no hay más resultados, salir del bucle
        if (!result || result.length === 0) {
            console.log(`No hay más resultados en la página ${page}`);
            break;
        }

        const listOfOffers = [];

        // Buscar ofertas para cada juego de esta página
        for (let i = 0; i < result.length; i++) {
            const lookForEachGameOffer = await searchOffers(result[i].name);

            const filterBestOffers = lookForEachGameOffer.filter((e: any) => {
                const valor = Math.trunc(Number(e.savings));
                return valor > 70;
            });

            if (filterBestOffers.length > 0) {
                listOfOffers.push(filterBestOffers);
            }
        }

        // Obtener la mejor oferta de cada juego
        const bestOffers = [];
        for (let i = 0; i < listOfOffers.length; i++) {
            const gameBestOffer = listOfOffers[i].reduce((prev: any, curr: any) => {
                const prevValue = Math.trunc(Number(prev.savings));
                const currentValue = Math.trunc(Number(curr.savings));

                if (prevValue < currentValue) {
                    return curr;
                } else {
                    return prev;
                }
            });

            bestOffers.push(gameBestOffer);
        }

        // Agregar las nuevas ofertas al array principal
        agedLikeWineGames.push(...bestOffers);

        // Eliminar duplicados después de cada iteración
        agedLikeWineGames = removeDuplicatesByBestPrice(agedLikeWineGames);
        
        console.log(`Página ${page} procesada. Total de juegos únicos: ${agedLikeWineGames.length}`);

        // Incrementar página para la siguiente iteración
        page++;
    }

    // Verificar si conseguimos el número deseado
    if (agedLikeWineGames.length < targetCount) {
        console.warn(`Solo se encontraron ${agedLikeWineGames.length} juegos de ${targetCount} deseados`);
    }

    // Limitar a exactamente 10 si tenemos más
    const finalResult = agedLikeWineGames.slice(0, targetCount);

    console.log(`Función completada con ${finalResult.length} juegos únicos`);
    return finalResult;
};
