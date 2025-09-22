import "server-only";
import { getThreeYearsDateRange, calculatePopularityScore, slugToGameName, formatDateES } from "@/functions/functions";
import { searchOffers } from "./getOffers";
import { bestOfferType, GameDealWithoutScore, GameDeal, dealStoreData, StoreLogo, publishersAndDevelopersType, tag, developerAndPublisherType } from "@/types/types";
import searchForStore from "./seachForStore";
import { storeLogos, storeBanner } from "@/resources/stores_icons"
import { translateAndStoreGameAction } from "@/actions/translationActions";

const API_KEY = process.env.RAWG_API_KEY;

/* GET MAIN GAME */

export const getMostPopularGame = async (retries = 3) => {
    const wantedMetacritic = "80,100"
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=${wantedMetacritic}&ordering=-metacritic&dates=${getThreeYearsDateRange()}&page_size=20`

    for (let attempt = 0; attempt < retries; attempt++) {

        try {
            /* Get Game Info */
            const res = await fetch(`${url}`, {
                next: {
                    revalidate: 3600,
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

    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${e}`, {
        cache: 'force-cache'
    });

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = response.json();

    return data;
};

/* GET GAME INFO FOR GAMEPAGE */

export const getGameInfoGamePage = async (e: string) => {

    const headerImage = await getHeaderImage(e);
    const gameTrailer = await getGameTrailer(headerImage.game_id);
    const gameOffers = await getGameOffers(e);
    const gameData = await getGameData(headerImage.game_id);
    const getFranchise = await getFranchiseGames(headerImage.game_id);

    const data = {
        gameTrailer: gameTrailer,
        ...headerImage,
        ...gameOffers,
        ...gameData,
    }

    return data;
};

export const getHeaderImage = async (e: string) => {

    const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${e}`)

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    console.log(data);

    const gameId = data.results[0].id;
    const headerImage = data.results[0].background_image;
    const screenshots = data.results[0].short_screenshots;

    const images = {
        game_id: gameId,
        header: headerImage,
        screenshots: screenshots,
    }

    return images;
};

export const getGameOffers = async (e: string) => {

    const titleForComparison = slugToGameName(e).toUpperCase().replace(/\s+/g, '');
    const gameOffers = await searchOffers(e);
    const listOfStores = await searchForStore();

    const filteredOffers = gameOffers.filter((offer: GameDeal) => {
        return offer.internalName === titleForComparison;
    })

    const bestDeal = filteredOffers.reduce((cheapest: GameDeal, current: GameDeal) => {
        const cheapestPrice = Number(cheapest.salePrice);
        const currentPrice = Number(current.salePrice);
        return currentPrice < cheapestPrice ? current : cheapest;
    });

    const restOfTheOffers = filteredOffers.filter((e: GameDeal) => {
        return e.dealID !== bestDeal.dealID;
    })

    const bestDealStore = listOfStores.find((e: dealStoreData) => e.storeID === bestDeal.storeID);
    const bestDealstoreImage = storeLogos.find((e: StoreLogo) => e.name === bestDealStore.storeName);

    const bestOfferData = {
        gameTitle: bestDeal.title,
        discount: `${Number(bestDeal.savings).toFixed(0)}%`,
        normalPrice: `${bestDeal.normalPrice}€`,
        currentPrice: `${bestDeal.salePrice}€`,
        offerImage: bestDeal.thumb.replace('capsule_sm_120', 'capsule_616x353'),
        store: bestDealstoreImage,
    }

    const restOfTheOffersData = restOfTheOffers.map((offer: GameDeal) => {

        const store = listOfStores.find((e: dealStoreData) => e.storeID === offer.storeID);
        const storeImage = storeBanner.find((e: StoreLogo) => e.name === store.storeName);

        return {
            gameTitle: offer.title,
            discount: `${Number(offer.savings).toFixed(0)}%`,
            normalPrice: `${offer.normalPrice}€`,
            currentPrice: `${offer.salePrice}€`,
            store: storeImage,
        }
    })

    const offers = {
        bestOffer: bestOfferData,
        restOfTheOffers: restOfTheOffersData,
    }

    return offers;
};

export const getGameTrailer = async (e: string) => {
    const response = await fetch(`https://api.rawg.io/api/games/${e}/movies?key=${API_KEY}`)

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    const trailer = data.results[0];

    return trailer;
}

export const getGameData = async (e: string) => {
    const response = await fetch(`https://api.rawg.io/api/games/${e}?key=${API_KEY}`)

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    const result = await translateAndStoreGameAction({
        gameId: `${data.id}`, description: data.description_raw, tags: data.tags, genres: data.genres
    });

    let developersAndPublishers: developerAndPublisherType = {};

    if (data.developers.length > 4) {
        developersAndPublishers.developers = data.developers.slice(0, 4);
    } else {
        developersAndPublishers.developers = data.developers;
    }

    if (data.publishers.length > 4) {
        developersAndPublishers.publishers = data.publishers.slice(0, 4);
    } else {
        developersAndPublishers.publishers = data.publishers;
    }

    const filteredData = {
        title: data.name,
        description: result.data.description ? result.data.description : data.description_raw,
        meta_critic: data.metacritic,
        about_the_game: {
            esrb: data.esrb_rating ? data.esrb_rating.name : "No ESRB rating found",
            released_data: `${formatDateES(data.released)}`,
            publishers: data.publishers.map((e: publishersAndDevelopersType) => e.name),
            genres: result.data.genres,
            developers: data.developers.map((e: publishersAndDevelopersType) => e.name),
            tags: result.data.tags ? result.data.tags : data.tags.map((e: tag) => e.name),
        }
    }

    return filteredData;
};

export const getFranchiseGames = async (e: string) => {

    const response = await fetch(`https://api.rawg.io/api/games/${e}/game-series?key=${API_KEY}`);

    if (!response.ok) {
        throw new Error("Franchises could not be fetched, an error has occurred during fetching");
    }

    const data = await response.json();
};

/* Traduccionnes. */



