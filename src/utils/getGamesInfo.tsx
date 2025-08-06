import "server-only";
import { getThreeYearsDateRange, calculatePopularityScore } from "@/functions/functions";
import { searchOffers } from "./getOffers";

/* GET MAIN GAME */

const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

export const getMostPopularGame = async () => {

    const wantedMetacritic = "80,100"

    const url = `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=${wantedMetacritic}&ordering=-metacritic&dates=${getThreeYearsDateRange()}&page_size=40`
    const res = await fetch(`${url}`, {
        cache: 'default'
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    const gamesWithDeals: any[] = [];

    for (const e of data.results) {
        const gameInfo = {
            game: e.slug,
            name: e.name,
            id: e.id,
            backgroundImage: e.background_image,
            score: calculatePopularityScore(e),
        };

        const search = await searchOffers(e.name);

        const bestDeal = search.length > 0
            ? search.reduce((max: any, deal: any) =>
                parseFloat(deal.savings) > parseFloat(max.savings) ? deal : max
            )
            : null;

        gamesWithDeals.push({
            ...gameInfo,
            deal: bestDeal
        });
    }

    const gamesWithValidDeals = gamesWithDeals.filter(g => g.deal);

    const bestGameDeal = gamesWithValidDeals.reduce((max, game) => {
        const current = parseFloat(game.deal.savings || "0");
        const maxSavings = parseFloat(max.deal.savings || "0");
        return current > maxSavings ? game : max;
    });

    console.log(bestGameDeal);

    return bestGameDeal;
};


/* GET SPECIFIC GAME */

const getGameInfo = async (e: string) => {

    const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${e}`, {
        cache: 'force-cache'
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = response.json();

    return data;
};

export default getGameInfo;