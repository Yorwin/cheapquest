import "server-only";
import { getTop11Deals, removeDuplicatesByBestPrice } from "@/functions/functions";
import { Top11Deals, GameDealWithoutScore } from "@/types/types";

export const getMostPopularOffers = async () => {

    const responseOffers = await fetch("https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating", {
        cache: "default"
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

export const getNewDeals = async () => {

    const response = await fetch("https://www.cheapshark.com/api/1.0/deals?maxAge=12&onSale=1&sortBy=DealRating", {
        cache: "default"
    })

    if (!response.ok) {
        throw new Error("Error when trying to fetch new offers");
    }

    const data = await response.json();
    
    const removeDuplicates = removeDuplicatesByBestPrice(data);

    const newDeals: GameDealWithoutScore[] = removeDuplicates.slice(0, 10);

    return newDeals;
};

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

