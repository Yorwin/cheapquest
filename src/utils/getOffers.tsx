import "server-only";

import { getTop11Deals, removeDuplicatesByBestPrice, removeDuplicatesMostPopularOffers } from "@/functions/functions";
import { GameDeal, GameDealWithoutScore } from "@/types/types";
import { getGameInfo } from "./getGamesInfo";
import { db } from "@/lib/firebase-admin";

/* Delay */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* GET SPECIFIC OFFERS */

export const searchOffers = async (e: string) => {
    try {
        const cleanGameNameForTag = e.toLowerCase().replace(/[^a-z0-9]/g, '-');

        const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${e}&exact=1&onSale=1`, {
            next: {
                revalidate: 1800,
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

/* Search Deal Info */

export const searchDealInfo = async (id: string) => {
    try {

        const url = `https://www.cheapshark.com/api/1.0/deals?id=${id}`;
        const request = await fetch(`${url}`, {
            next: {
                revalidate: 3600,
                tags: [`offers-for-game-${id}`]
            }
        });

        if (!request.ok) {
            throw new Error(`Error al intentar obtener la información de la oferta ${request.status}`);
        }

        const res = await request.json();

        return res;

    } catch (error) {
        console.error(`Error trying to get deal info ${error}`);
    }
};

/* GET MOST POPULAR OFFERS */

export const getMostPopularOffers = async (retries = 3) => {

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const responseOffers = await fetch("https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating&onSale=1", {
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
            const removeDuplicated: GameDealWithoutScore[] = removeDuplicatesMostPopularOffers(resultArray);
            const getDeals = getTop11Deals(removeDuplicated);

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
                    revalidate: 43200,
                    tags: ["new-deals-info"]
                }
            })

            if (!response.ok) {
                throw new Error("Error when trying to fetch new offers");
            }

            const data = await response.json();
            const removeDuplicates = removeDuplicatesByBestPrice(data);

            const newDeals: GameDealWithoutScore[] = removeDuplicates.slice(0, 8);

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

export const getAgedLikeWineGames = async () => {
    try {
        const docRef = db.collection("agedLikeWineGames").doc("latest");
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            return docSnap.data()?.data; // Return stored data
        } else {
            console.warn("No cached aged like wine games found, returning empty array");
            return []; // Or implement fallback fetch if needed
        }
    } catch (error) {
        console.error("Error reading aged like wine games:", error);
        return [];
    }
};

/* GET BEST OFFER BY PERCENTAGE */

export const offersByPercentage = async () => {
    const request = await fetch("https://www.cheapshark.com/api/1.0/deals?sortBy=Savings&onSale=1", {
        next: {
            revalidate: 21600,
            tags: ["best-offers-by-percentage"],
        }
    })

    if (!request.ok) {
        throw new Error("Error when trying to fetch offers by percentage")
    }

    const res = await request.json();

    const filteredOffers = res.filter((offer: GameDeal) => !offer.title.includes("Bundle") && !offer.title.includes("WallPaper"));

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

export const historicalLows = async () => {
    try {
        const docRef = db.collection("historicalLows").doc("latest");
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            return docSnap.data()?.data; // Return stored data
        } else {
            console.warn("No cached historical lows found, returning empty array");
            return []; // Or implement fallback fetch if needed
        }
    } catch (error) {
        console.error("Error reading historical lows:", error);
        return [];
    }
};