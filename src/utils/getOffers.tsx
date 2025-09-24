import "server-only";
import { fetchGamesInfoCheapShark, getTop11Deals, removeDuplicatesByBestPrice } from "@/functions/functions";
import { GameDeal, GameDealWithoutScore, gameOfferInfo, dealsInfoOffer } from "@/types/types";
import { getGameInfo } from "./getGamesInfo";

const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

/* Delay */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* GET SPECIFIC OFFERS */

export const searchOffers = async (e: string) => {
    try {
        const cleanGameNameForTag = e.toLowerCase().replace(/[^a-z0-9]/g, '-');

        const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${e}&exact=1`, {
            next: {
                revalidate: 1800, // 30 minutos (más frecuente que el juego principal)
                tags: ['game-deals',
                    `deal-${cleanGameNameForTag}`,
                    'cheapshark-api'],
            }
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('Rate limited by CheapShark API');
            }

            throw new Error(`CheapShark API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`Error searching deals for "${e}":`, error);
        return []; // Devolver array vacío en lugar de undefined
    }
};

/* GET MOST POPULAR OFFERS */

export const getMostPopularOffers = async (retries = 3) => {

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const responseOffers = await fetch("https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating", {
                next: {
                    revalidate: 3600,
                    tags: ['most-popular-games-info', 'most-popular-games-search']
                },
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
        } catch (error) {
            console.error("Se ha producido un error al intentar obtener las ofertas más populares" + error);

            if (attempt === retries - 1) {
                // Último intento fallido, devolver array vacío en lugar de fallar
                console.error(`All attempts failed for game, returning empty array`);
            }

            // Espera exponencial
            await delay(Math.pow(2, attempt) * 1000);
        }
    }
};

/* GET NEW DEALS */

export const getNewDeals = async (retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch("https://www.cheapshark.com/api/1.0/deals?maxAge=12&onSale=1&sortBy=DealRating", {
                next: {
                    revalidate: 3600,
                    tags: ["new-deals-info"]
                }
            })

            if (!response.ok) {
                throw new Error("Error when trying to fetch new offers");
            }

            const data = await response.json();
            const removeDuplicates = removeDuplicatesByBestPrice(data);

            const newDeals: GameDealWithoutScore[] = removeDuplicates.slice(0, 10);

            return newDeals;
        } catch (error) {
            console.error("Se ha producido un error al intentar obtener las nuevas ofertas" + error);

            if (attempt === retries - 1) {
                // Último intento fallido, devolver array vacío en lugar de fallar
                console.error(`All attempts failed for game, returning empty array`);
            }

            // Espera exponencial
            await delay(Math.pow(2, attempt) * 1000);
        }
    }
};

/* GET AGED LIKE WINE GAMES */

export const getAgedLikeWineGames = async (retries = 3) => {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const today = new Date();
            const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
                .toISOString().split('T')[0];

            let agedLikeWineGames: any[] = [];
            let allFoundOffers: GameDealWithoutScore[] = []; // Cache
            let page: number = 1;
            const targetCount: number = 10;
            const maxPages: number = 1;

            // Niveles de exigencia decrecientes
            const savingsLevels = [75, 60, 45, 25, 10];
            let currentSavingsLevel = 0;

            while (agedLikeWineGames.length < targetCount && currentSavingsLevel < savingsLevels.length) {
                const currentMinSavings = savingsLevels[currentSavingsLevel];

                // Si no es el primer nivel, primero revisar ofertas ya encontradas
                if (currentSavingsLevel > 0) {
                    const reprocessedOffers = allFoundOffers.filter((offer: GameDealWithoutScore) => {
                        const valor = Math.trunc(Number(offer.savings));
                        return valor >= currentMinSavings;
                    });

                    if (reprocessedOffers.length > 0) {
                        // Obtener las mejores ofertas por juego de las ya encontradas
                        const gameOfferMap = new Map<string, GameDealWithoutScore>();

                        reprocessedOffers.forEach((offer: GameDealWithoutScore) => {
                            const gameKey = offer.title.toLowerCase().trim();
                            const existingOffer = gameOfferMap.get(gameKey);

                            if (!existingOffer ||
                                Math.trunc(Number(offer.savings)) > Math.trunc(Number(existingOffer.savings))) {
                                gameOfferMap.set(gameKey, offer);
                            }
                        });

                        const bestOffersFromCache = Array.from(gameOfferMap.values());
                        agedLikeWineGames.push(...bestOffersFromCache);
                        agedLikeWineGames = removeDuplicatesByBestPrice(agedLikeWineGames);

                        if (agedLikeWineGames.length >= targetCount) {
                            break;
                        }
                    }
                }

                // Si aún necesitamos más juegos, hacer nuevas consultas
                page = currentSavingsLevel === 0 ? 1 : page; // Reset page solo en el primer nivel

                while (agedLikeWineGames.length < targetCount && page <= maxPages) {
                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=${API_KEY}&dates=1900-01-01,${fiveYearsAgo}&ordering=-rating&page_size=60&platforms=1&metacritic=80,100&page=${page}`,
                        {
                            next: {
                                revalidate: 3600,
                                tags: ['aged-like-wine-games', 'aged-like-wine-search']
                            }
                        }
                    );

                    if (!response.ok) {
                        throw new Error(`Error when trying to look for the old games on page ${page}`);
                    }

                    const data = await response.json();
                    const result = data.results;

                    if (!result || result.length === 0) {
                        console.log(`No hay más juegos en la página ${page}`);
                        break;
                    }

                    const listOfOffers: GameDealWithoutScore[][] = [];

                    // Buscar ofertas para cada juego de esta página
                    for (let i = 0; i < result.length; i++) {
                        // Solo hacer la llamada si no hemos buscado este juego antes
                        const gameAlreadySearched = allFoundOffers.some(offer =>
                            offer.title.toLowerCase().includes(result[i].name.toLowerCase().substring(0, 10))
                        );

                        if (!gameAlreadySearched) {
                            try {
                                const lookForEachGameOffer = await searchOffers(result[i].name);

                                // Guardar TODAS las ofertas encontradas para uso futuro
                                if (lookForEachGameOffer && lookForEachGameOffer.length > 0) {
                                    allFoundOffers.push(...lookForEachGameOffer);
                                }

                                // Filtrar con el nivel actual de exigencia
                                const filterBestOffers = lookForEachGameOffer.filter((e: GameDealWithoutScore) => {
                                    const valor = Math.trunc(Number(e.savings));
                                    return valor >= currentMinSavings;
                                });

                                if (filterBestOffers.length > 0) {
                                    listOfOffers.push(filterBestOffers);
                                }

                                // Pequeño delay para no saturar la API
                                await delay(100);
                            } catch (error) {
                                console.warn(`Error buscando ofertas para ${result[i].name}:`, error);
                            }
                        }
                    }

                    // Obtener la mejor oferta de cada juego
                    const bestOffers = [];
                    for (let i = 0; i < listOfOffers.length; i++) {
                        const gameBestOffer = listOfOffers[i].reduce((prev: GameDealWithoutScore, curr: GameDealWithoutScore) => {
                            const prevValue = Math.trunc(Number(prev.savings));
                            const currentValue = Math.trunc(Number(curr.savings));
                            return currentValue > prevValue ? curr : prev;
                        });

                        bestOffers.push(gameBestOffer);
                    }

                    // Agregar las nuevas ofertas al array principal
                    agedLikeWineGames.push(...bestOffers);
                    agedLikeWineGames = removeDuplicatesByBestPrice(agedLikeWineGames);

                    //Verificar nro. de juegos encontrados. 
                    /* console.log(`Página ${page}: Encontrados ${agedLikeWineGames.length}/${targetCount} juegos`);*/

                    page++;
                }

                // Si después de recorrer todas las páginas no tenemos suficientes juegos,
                // pasar al siguiente nivel de exigencia
                if (agedLikeWineGames.length < targetCount) {
                    currentSavingsLevel++;
                    if (currentSavingsLevel < savingsLevels.length) {

                        //Cambio de nivel del descueto. 
                        /* console.log(`Cambiando a nivel de descuento: ${savingsLevels[currentSavingsLevel]}%`); */

                        page = 1; // Reset página para el nuevo nivel
                    }
                } else {
                    break; // Ya tenemos suficientes juegos
                }
            }

            // Verificar resultado final

            /* if (agedLikeWineGames.length < targetCount) {
                console.warn(`Solo se encontraron ${agedLikeWineGames.length} juegos de ${targetCount} deseados después de todos los niveles`);
            } else {
                console.log(`Búsqueda exitosa: ${agedLikeWineGames.length} juegos encontrados`);
            }
            */

            // Limitar a exactamente el número objetivo si tenemos más
            const finalResult = agedLikeWineGames.slice(0, targetCount);

            // Log final del nivel de descuento utilizado
            const usedLevel = Math.min(currentSavingsLevel, savingsLevels.length - 1);

            //Verificar resultado
            /* console.log(`Resultado final con nivel mínimo de descuento: ${savingsLevels[usedLevel]}%`); */

            return finalResult;

        } catch (error) {
            console.error("Se ha producido un error al intentar obtener las nuevas ofertas: " + error);

            if (attempt === retries - 1) {
                console.error(`All attempts failed, returning empty array`);
                return [];
            }

            // Espera exponencial
            await delay(Math.pow(2, attempt) * 1000);
        }
    }

    return []; // Fallback si todos los reintentos fallan
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
    const historicalLows: any[] = [];
    let pageNumber = 0;
    const targetElements = 10; // Número mínimo de elementos que queremos

    while (historicalLows.length < targetElements) {
        const requestAAAGames = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?onSale=1&AAA=1&pageNumber=${pageNumber}&pageSize=30`,
            {
                next: {
                    revalidate: 3600,
                    tags: [`deals-AAA-games-pagenumber${pageNumber + 1}`]
                }
            }
        );

        if (!requestAAAGames.ok) {
            console.error(`Status: ${requestAAAGames.status}`);
            throw new Error("Error when trying to get AAA Games");
        }

        const AAAGamesData = await requestAAAGames.json();

        // Si no hay más resultados, salir del loop
        if (!AAAGamesData || AAAGamesData.length === 0) {
            break;
        }

        const gamesPrices = await fetchGamesInfoCheapShark(AAAGamesData);

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

        if (pageNumber > 50) {
            console.log("Maximum page limit reached");
            break;
        }
    }

    // Retornar solo los primeros 10 elementos si hay más
    return historicalLows.slice(0, targetElements);
};

