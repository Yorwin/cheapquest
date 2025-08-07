import "server-only";
import { getTop11Deals, removeDuplicatesByBestPrice } from "@/functions/functions";
import { GameDeal, GameDealWithoutScore } from "@/types/types";

const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

/* GET MAIN OFFER */

export const getMostPopularGameOffer = async (e: string) => {

    const responseGame = await fetch(`https://www.cheapshark.com/api/1.0/games?title=~${e}`, {
        cache: "force-cache"
    });

    if (!responseGame.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await responseGame.json();
    const selectedGame = data.slice(0, 1);
    const selectedGameID = selectedGame[0].gameID;

    const responseOffers = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${selectedGameID}`, {
        cache: 'no-store'
    });

    if (!responseOffers.ok) {
        throw new Error("Failed to fetch data");
    }

    const offersData = await responseOffers.json();

    return offersData;
};

/* GET MOST POPULAR OFFERS */

export const getMostPopularOffers = async () => {

    const responseOffers = await fetch("https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating", {
        cache: "force-cache"
    });

    if (!responseOffers.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await responseOffers.json();

    const deduplicated: Record<string, GameDealWithoutScore> = {};

    response.forEach((e: GameDealWithoutScore) => {
        const key = e.internalName;
        const currentSavings = parseFloat(e.savings);

        if (!deduplicated[key] || currentSavings > parseFloat(deduplicated[key].savings)) {
            deduplicated[key] = e;
        }
    })

    const resultArray: GameDealWithoutScore[] = Object.values(deduplicated);
    const getDeals = getTop11Deals(resultArray);

    return getDeals;
};

/* GET NEW DEALS */

export const getNewDeals = async () => {

    const response = await fetch("https://www.cheapshark.com/api/1.0/deals?maxAge=12&onSale=1&sortBy=DealRating", {
        cache: "force-cache"
    })

    if (!response.ok) {
        throw new Error("Error when trying to fetch new offers");
    }

    const data = await response.json();
    const removeDuplicates = removeDuplicatesByBestPrice(data);

    const newDeals: GameDealWithoutScore[] = removeDuplicates.slice(0, 10);

    return newDeals;
};

/* GET SPECIFIC OFFERS */

export const searchOffers = async (e: string) => {

    const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${e}`, {
        cache: "force-cache"
    });

    if (!response.ok) {
        throw new Error("Error when trying to search for a deal for this game");
    }

    const data = await response.json();

    return data
};

/* GET AGED LIKE WINE GAMES */

export const getAgedLikeWineGames = async () => {
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
        .toISOString().split('T')[0]; // Formato YYYY-MM-DD

    let agedLikeWineGames: any = [];    
    let page = 1;
    const targetCount = 10; // Número mínimo de juegos que queremos
    const maxPages = 5; // Límite de seguridad para evitar bucles infinitos

    while (agedLikeWineGames.length < targetCount && page <= maxPages) {

        const response = await fetch(
            `https://api.rawg.io/api/games?key=${API_KEY}&dates=1900-01-01,${fiveYearsAgo}&ordering=-rating&page_size=60&platforms=1&metacritic=80,100&page=${page}`,
            { cache: "force-cache" }
        );

        if (!response.ok) {
            throw new Error(`Error when trying to look for the old games on page ${page}`);
        }

        const data = await response.json();
        const result = data.results;

        // Si no hay más resultados, salir del bucle
        if (!result || result.length === 0) {
            break;
        }

        const listOfOffers: GameDealWithoutScore[][] = [];

        // Buscar ofertas para cada juego de esta página
        for (let i = 0; i < result.length; i++) {
            const lookForEachGameOffer = await searchOffers(result[i].name);

            const filterBestOffers = lookForEachGameOffer.filter((e: GameDealWithoutScore) => {
                const valor = Math.trunc(Number(e.savings));
                return valor > 75;
            });

            if (filterBestOffers.length > 0) {
                listOfOffers.push(filterBestOffers);
            }
        }

        // Obtener la mejor oferta de cada juego
        const bestOffers : GameDealWithoutScore[] = [];

        for (let i = 0; i < listOfOffers.length; i++) {
            const gameBestOffer = listOfOffers[i].reduce((prev: GameDealWithoutScore, curr: GameDealWithoutScore) => {
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

        // Incrementar página para la siguiente iteración
        page++;
    }

    // Verificar si conseguimos el número deseado
    if (agedLikeWineGames.length < targetCount) {
        console.warn(`Solo se encontraron ${agedLikeWineGames.length} juegos de ${targetCount} deseados`);
    }

    // Limitar a exactamente 10 si tenemos más
    const finalResult = agedLikeWineGames.slice(0, targetCount);

    return finalResult;
};


