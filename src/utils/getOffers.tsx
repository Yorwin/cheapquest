import "server-only";

import { getTop11Deals, removeDuplicatesByBestPrice, removeDuplicatesMostPopularOffers } from "@/functions/functions";
import { GameDeal, GameDealWithoutScore } from "@/types/types";
import { getGameInfo } from "./getGamesInfo";
import { db } from "@/lib/firebase-admin";
import { cachedCheapSharkFetch } from "@/lib/api-cache-server";

/* Delay */

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/* GET SPECIFIC OFFERS */

export const searchOffers = async (e: string) => {
    try {
        const data = await cachedCheapSharkFetch('/deals', {
            title: e,
            exact: 1,
            onSale: 1
        });
        return data;
    } catch (error) {
        console.error(`Error searching deals for "${e}":`, error);
        return []; // Devolver array vacío en lugar de undefined
    }
};

/* Search Deal Info */

export const searchDealInfo = async (id: string) => {
    try {
        const data = await cachedCheapSharkFetch('/deals', { id });
        return data;
    } catch (error) {
        console.error(`Error trying to get deal info ${error}`);
        return null;
    }
};

/* GET MOST POPULAR OFFERS */

export const getMostPopularOffers = async (retries = 3) => {

    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await cachedCheapSharkFetch('/deals', {
                sortBy: 'DealRating',
                onSale: 1
            });

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
            const data = await cachedCheapSharkFetch('/deals', {
                maxAge: 12,
                onSale: 1,
                sortBy: 'DealRating'
            });
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
    try {
        const res = await cachedCheapSharkFetch('/deals', {
            sortBy: 'Savings',
            onSale: 1
        });

    const filteredOffers = res.filter((offer: GameDeal) => !offer.title.includes("Bundle") && !offer.title.includes("WallPaper"));

    const bestOffers = filteredOffers.slice(0, 5);

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

        return Promise.all(completeDataPromises);
    } catch (error) {
        console.error('Error fetching offers by percentage:', error);
        return [];
    }
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