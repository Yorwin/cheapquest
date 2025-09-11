import "server-only";
import { getThreeYearsDateRange, calculatePopularityScore } from "@/functions/functions";
import { searchOffers } from "./getOffers";
import { bestOfferType, GameDealWithoutScore } from "@/types/types";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

/* GET MAIN GAME */

export const getMostPopularGame = async (retries = 3 )  => {
    const wantedMetacritic = "80,100"
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=${wantedMetacritic}&ordering=-metacritic&dates=${getThreeYearsDateRange()}&page_size=40`

    for (let attempt = 0; attempt < retries; attempt++) {

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

                const search = await searchOffers(gameInfo.name);
                
                const bestDeal = search.length > 0
                    ? search.reduce((max: GameDealWithoutScore, deal: GameDealWithoutScore) =>
                        parseFloat(deal.savings) > parseFloat(max.savings) ? deal : max
                    )
                    : null;

                if (bestDeal) {
                    gamesWithDeals.push({
                        ...gameInfo,
                        deal: bestDeal
                    });
                }
            }

            const bestGameDeal = gamesWithDeals.reduce((max: bestOfferType, game: bestOfferType) => {
                const current = parseFloat(game.deal.savings || "0");
                const maxSavings = parseFloat(max.deal.savings || "0");
                return current > maxSavings ? game : max;
            });

            return bestGameDeal;

        } catch (error) {
            console.error("Se ha producido un error al intentar obtener el MainOffer" + error);

            if (attempt === retries - 1) {
                // Último intento fallido, devolver array vacío en lugar de fallar
                console.error(`All attempts failed for game, returning empty array`);
            }

            // Espera exponencial
            await new Promise(resolve =>
                setTimeout(resolve, Math.pow(2, attempt) * 1000)
            );
            
        }
    }
}


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
