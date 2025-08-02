import "server-only";
import { getThreeYearsDateRange, calculatePopularityScore } from "@/functions/functions"

const API_KEY = "0c4571b7e87e4022b529e1b63f824d16"

export const getMostPopularGame = async () => {

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
            backgroundImage: e.background_image,
            score: calculatePopularityScore(e)
        }

        gamesArray.push(gameInfo);
    })

    const bestGame = gamesArray.reduce((prev, current) => {
        return current.score > prev.score ? current : prev;
    });

    return bestGame;
};

export const getAgedLikeWineGames = async () => {

    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
        .toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&dates=1900-01-01,${fiveYearsAgo}&ordering=-rating&page_size=60&platforms=1&metacritic=80,100`, {
        cache: "force-cache"
    });

    if (!response.ok) {
        throw new Error("Error when trying to look for the old games");
    }

    const data = await response.json();
    const result = data.results;

    return result;
};