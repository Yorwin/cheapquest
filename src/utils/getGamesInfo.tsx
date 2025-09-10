import "server-only";
import { getThreeYearsDateRange, calculatePopularityScore } from "@/functions/functions";
import { searchOffers } from "./getOffers";
import { bestOfferType, GameDealWithoutScore } from "@/types/types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

/* GET MAIN GAME */

export const getMostPopularGame = async (retries = 3) => {

    const wantedMetacritic = "80,100"
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=${wantedMetacritic}&ordering=-metacritic&dates=${getThreeYearsDateRange()}&page_size=40`

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {

            /* Get Game Info */
            const res = await fetch(`${url}`, {
                next: {
                    revalidate: 3000,
                    tags: ['main-game-info', 'main-game-search']
                },
            });

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}: ${res.statusText}`);
            }

            const data = await res.json();
            const gamesWithDeals: bestOfferType[] = [];

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
                    ? search.reduce((max: GameDealWithoutScore, deal: GameDealWithoutScore) =>
                        parseFloat(deal.savings) > parseFloat(max.savings) ? deal : max
                    )
                    : null;

                gamesWithDeals.push({
                    ...gameInfo,
                    deal: bestDeal
                });
            }

            const gamesWithValidDeals: bestOfferType[] = gamesWithDeals.filter(g => g.deal);

            const bestGameDeal = gamesWithValidDeals.reduce((max: bestOfferType, game: bestOfferType) => {
                const current = parseFloat(game.deal.savings || "0");
                const maxSavings = parseFloat(max.deal.savings || "0");
                return current > maxSavings ? game : max;
            });

            return bestGameDeal;

        } catch (error) {
            console.error(`Attempt ${attempt} failed fetching best games info:`, error)
            await delay(Math.pow(2, attempt) * 1000);
        }
    }

    throw new Error('Unexpected end of function');
};

/* GET SPECIFIC GAME */

export const getGameInfo = async (e: string) => {

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
