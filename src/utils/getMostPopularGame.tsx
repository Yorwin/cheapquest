import "server-only";
import { getThreeYearsDateRange, calculatePopularityScore } from "@/functions/functions"

const getMostPopularGame = async () => {

    const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"
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
            backgroundImage : e.background_image,
            score: calculatePopularityScore(e)
        }

        gamesArray.push(gameInfo);
    })

    const bestGame = gamesArray.reduce((prev, current) => {
        return current.score > prev.score ? current : prev;
    });

    return bestGame;
};

export { getMostPopularGame };