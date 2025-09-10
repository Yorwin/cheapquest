import "server-only";
import { getTop11Deals, removeDuplicatesByBestPrice } from "@/functions/functions";
import { GameDeal, GameDealWithoutScore, gameOfferInfo, dealsInfoOffer } from "@/types/types";
import { getGameInfo } from "./getGamesInfo";

const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

/* Delay */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* GET MAIN OFFER */

export const getMostPopularGameOffer = async (e: string, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {

            const responseGame = await fetch(`https://www.cheapshark.com/api/1.0/games?title=~${e}`, {
                next: {
                    revalidate: 1800,
                    tags: ['main-game', 'main-game-search']
                },
            });

            if (!responseGame.ok) {
                throw new Error(`HTTP ${responseGame.status}: ${responseGame.statusText}`);
            }

            const gameData = await responseGame.json();

            if (gameData.length === 0) {
                throw new Error(`No results found for game: "${e}"`);
            }

            const selectedGame = gameData[0].gameID;

            const responseOffers = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${selectedGame}`, {
                next: {
                    revalidate: 300, // 4 minutos
                    tags: ['offers', 'live-prices', `offers-${selectedGame}`]
                }
            });

            if (!responseOffers.ok) {
                throw new Error(`HTTP ${responseOffers.status}: ${responseOffers.statusText}`);
            }

            const offersData = await responseOffers.json();

            if (!offersData) {
                throw new Error('Empty response from offers API');
            }

            return {
                ...offersData,
                // Metadata útil
                _metadata: {
                    fetchedAt: new Date().toISOString(),
                    gameSearchTerm: e,
                    selectedGame
                }
            };

        } catch (error) {

            console.error(`Attempt ${attempt} failed for "${e}":`, error);

            if (attempt === retries) {
                // Último intento fallido
                const errorMessage = error instanceof Error ? error.message : String(error);
                throw new Error(`Failed to fetch offers after ${retries} attempts: ${errorMessage}`);
            }

            await delay(Math.pow(2, attempt) * 1000);
        }
    }
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
        cache: "no-store"
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
        cache: "no-store"
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

    let agedLikeWineGames: any[] = [];
    let page: number = 1;
    const targetCount: number = 10; // Número mínimo de juegos que queremos
    const maxPages: number = 5; // Límite de seguridad para evitar bucles infinitos

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
        const bestOffers = [];

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

/* GET BEST OFFER BY PERCENTAGE */

export const offersByPercentage = async () => {
    const request = await fetch("https://www.cheapshark.com/api/1.0/deals?sortBy=Savings", {
        cache: "force-cache"
    })

    if (!request.ok) {
        throw new Error("Error when trying to fetch offers by percentage")
    }

    const res = await request.json();

    const filteredOffers = res.filter((offer: GameDeal) => !offer.title.includes("Bundle"));

    const bestOffers = filteredOffers.slice(0, 10);

    const completeDataPromises = bestOffers.map(async (offer: GameDeal) => {
        const title = offer.title;

        return getGameInfo(title)
            .then((gameInfo) => {
                const firstResult = gameInfo.results[0] ?? null;

                return {
                    ...offer,
                    background_image: firstResult.background_image,
                };
            });
    });

    return Promise.all(completeDataPromises);;
};

/* GET HISTORIC LOWS */

export const historicLows = async () => {
    const historicalLows = [];
    let pageNumber = 0;
    const targetElements = 10; // Número mínimo de elementos que queremos

    while (historicalLows.length < targetElements) {
        const request = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?storeID=1&onSale=1&AAA=1&pageNumber=${pageNumber}`,
            { cache: "force-cache" }
        );

        if (!request.ok) {
            throw new Error("Error when trying to get Historic Lows");
        }

        const res = await request.json();

        // Si no hay más resultados, salir del loop
        if (!res || res.length === 0) {
            break;
        }

        const gamesPrices = [];

        for (let i = 0; i < res.length; i++) {
            const gameID = res[i].gameID;
            const gameInfo = await fetch(
                `https://www.cheapshark.com/api/1.0/games?id=${gameID}`,
                { cache: "force-cache" }
            );

            if (!gameInfo.ok) {
                throw new Error("Error when trying to get Historic Lows");
            }

            const gameInfoResponse = await gameInfo.json();
            gamesPrices.push(gameInfoResponse);
        }

        const filteredGames = gamesPrices.filter((game: gameOfferInfo) => {
            // Si falta cheapestPriceEver o deals, lo descartamos
            if (!game.cheapestPriceEver || !Array.isArray(game.deals) || game.deals.length === 0) {
                return false;
            }

            const lowest = Number(game.cheapestPriceEver.price);
            const currentLowestDeal = Math.min(
                ...game.deals.map((d: dealsInfoOffer) => Number(d.price))
            );

            return currentLowestDeal === lowest;
        });

        const completeDataPromises = filteredGames.map(async (game: gameOfferInfo) => {
            const title = game.info.title;

            // Encontrar el mejor deal (precio más bajo)
            const bestDeal = game.deals.reduce((cheapest: dealsInfoOffer, current: dealsInfoOffer) => {
                const cheapestPrice = Number(cheapest.price);
                const currentPrice = Number(current.price);
                return currentPrice < cheapestPrice ? current : cheapest;
            });

            return getGameInfo(title)
                .then((gameInfo) => {
                    const firstResult = gameInfo.results[0] ?? null;

                    return {
                        // Información básica del juego
                        title: game.info.title,
                        steamAppID: game.info.steamAppID,
                        thumb: game.info.thumb,

                        // Precio histórico más bajo
                        cheapestPriceEver: {
                            price: game.cheapestPriceEver.price,
                            date: game.cheapestPriceEver.date
                        },

                        // Mejor deal actual
                        bestDeal: {
                            storeID: bestDeal.storeID,
                            dealID: bestDeal.dealID,
                            price: bestDeal.price,
                            retailPrice: bestDeal.retailPrice,
                            savings: bestDeal.savings
                        },

                        // Background image de la API externa
                        background_image: firstResult?.background_image || game.info.thumb, // Fallback al thumb si no hay background_image
                    };
                })
                .catch((error) => {
                    console.error(`Error getting game info for ${title}:`, error);
                });
        });

        const resolvedGames = await Promise.all(completeDataPromises);
        historicalLows.push(...resolvedGames);

        pageNumber++;

        if (pageNumber > 50) { // Ajusta este número según sea necesario
            console.log("Maximum page limit reached");
            break;
        }
    }

    // Retornar solo los primeros 10 elementos si hay más
    return historicalLows.slice(0, targetElements);
};

