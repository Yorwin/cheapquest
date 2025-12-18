import "server-only";

import { cache } from "react";
import { getFiveYearsDateRange, calculatePopularityScore, slugToGameName, formatDateES, createGameSlug } from "@/functions/functions";
import { searchOffers } from "./getOffers";
import { bestOfferType, GameDealWithoutScore, GameDeal, dealStoreData, StoreLogo, publishersAndDevelopersType, tag, developerAndPublisherType, Genre, getGameDataProps, gameData, VerticalCardWrapperType, comparisonOfferType } from "@/types/types";
import searchForStore from "./seachForStore";
import { storeLogos, storeBanner } from "@/resources/stores_icons"
import { translateAndStoreGameAction } from "@/actions/translationActions";
import { inCaseOfError } from "@/components/general/error-loading-offers-fallback-container";
import { cachedRawgFetch, cachedRawgGenreFetch, getCachedGameTrailer, cachedCheapSharkFetch } from "@/lib/api-cache-server";
import { checkGameCache, updateGameWithFranchiseData, CheckMediaReviews, getCompletedGameTrailer } from "@/lib/firebase-cache";
import { getCurrency, formatPrice } from "@/lib/currencies";

const API_KEY = process.env.RAWG_API_KEY;

/* GET MAIN GAME */

export const getMostPopularGame = async (retries = 3) => {
    const wantedMetacritic = "80,100"
    const url = `https://api.rawg.io/api/games?key=${API_KEY}&metacritic=${wantedMetacritic}&ordering=-metacritic&dates=${getFiveYearsDateRange()}&page_size=20`

    for (let attempt = 0; attempt < retries; attempt++) {

        try {
            /* Get Game Info */
            const res = await fetch(`${url}`, {
                next: {
                    revalidate: 43200,
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
    try {
        const data = await cachedRawgFetch('/games', { search: e });
        return data;
    } catch (error) {
        console.error('Error fetching game info:', error);
        throw new Error("Failed to fetch data");
    }
};

/* GET GAME INFO FOR GAMEPAGE */

export const getGameInfoGamePage = async (e: string) => {

    const id = await getGameId(e);
    const images = await getHeaderImage(e);
    const gameTrailer = id && await checkTrailer(id);
    const gameOffers = await getGameOffers(e);
    const gameData = id !== null && await getGameData(id);
    const franchise = id !== null ? await getFranchiseGames(id) : [];
    const sameGenre = gameData ? await getSameGenre(gameData.about_the_game.original_lang_genres[0].id, Number(id)) : null;

    const data = {
        id: id,
        image: {
            header: images?.header,
            screenshots: images?.screenshots,
        },
        gameTrailer: gameTrailer,
        ...gameOffers,
        ...gameData,
        franchise: franchise,
        sameGenre: sameGenre,
    }

    return data;
};

/* GET GAME TRAILER IN RAWG OR YOUTUBE */
const checkTrailer = async (id: string) => {

    const rawgTrailer = await getGameTrailer(id);
    const youtubeTrailer = await getCompletedGameTrailer(id);

    const trailer = rawgTrailer ? rawgTrailer : youtubeTrailer;

    return trailer;
}

/* GET GAME ID */

export const getGameId = cache(async (e: string): Promise<string | null> => {
    try {
        const data = await cachedRawgFetch('/games', { search: e });

        if (!data.results || data.results.length === 0) {
            return null;
        }

        const gameId = data.results[0].id;
        return gameId.toString();
    } catch (error) {
        console.error('Error fetching game ID:', error);
        return null;
    }
});

interface headerImage {
    header: string,
    screenshots: string[],
}

export const getHeaderImage = cache(async (e: string): Promise<headerImage | null> => {
    try {
        const data = await cachedRawgFetch('/games', { search: e });

        if (!data.results || data.results.length === 0) {
            return null;
        }

        const headerImage = data.results[0].background_image;
        const screenshots = data.results[0].short_screenshots;

        const images: headerImage = {
            header: headerImage,
            screenshots: screenshots,
        }

        return images;
    } catch (error) {
        console.error('Error fetching header image:', error);
        return null;
    }
});

export const getGameOffers = cache(async (e: string) => {

    const titleForComparison = slugToGameName(e).toUpperCase().replace(/\s+/g, '');
    const gameOffers = await searchOffers(e);
    const listOfStores = await searchForStore();
    const currency = await getCurrency();

    if (gameOffers.length === 0) return null;

    const completeInfoOffer = await Promise.all(gameOffers.map(async (e: any) => {
        const dealURL = `https://www.cheapshark.com/redirect?dealID=${e.dealID}`;

        return {
            ...e,
            url: dealURL
        };
    }));

    const filteredOffers = completeInfoOffer.filter((offer: GameDeal) => {
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
        normalPrice: formatPrice(Number(bestDeal.normalPrice), currency),
        currentPrice: formatPrice(Number(bestDeal.salePrice), currency),
        offerImage: bestDeal.thumb.replace('capsule_sm_120', 'capsule_616x353'),
        store: bestDealstoreImage,
        url: bestDeal.url,
    }

    const restOfTheOffersData: comparisonOfferType[] = restOfTheOffers.map((offer: GameDeal) => {

        const store = listOfStores.find((e: dealStoreData) => e.storeID === offer.storeID);
        const storeImage = storeBanner.find((e: StoreLogo) => e.name === store.storeName);

        return {
            gameTitle: offer.title,
            discount: `${Number(offer.savings).toFixed(0)}%`,
            normalPrice: formatPrice(Number(offer.normalPrice), currency),
            currentPrice: formatPrice(Number(offer.salePrice), currency),
            store: storeImage,
            url: offer.url,
        }
    })

    const offers = {
        bestOffer: bestOfferData,
        restOfTheOffers: restOfTheOffersData,
    }

    return offers;
});

export const getGameTrailer = cache(async (e: string) => {
    return await getCachedGameTrailer(e);
});

export const getGameData: getGameDataProps = cache(async (gameId: string) => {
    try {
        const selectedGame = await cachedRawgFetch(`/games/${gameId}`);

        if (!selectedGame) {
            return null;
        }

        /* Media Reviews */
        const mediaReviews = await CheckMediaReviews(gameId);

        /* Steam Rating */
        let steamRating;
        const getOffersInfo = await cachedCheapSharkFetch('/deals', { title: selectedGame.name });

        if (!getOffersInfo || getOffersInfo.length === 0) {
            steamRating = null;
        } else {
            const offer = getOffersInfo[0];
            steamRating = {
                steamRatingCount: offer.steamRatingCount,
                steamRatingPercent: offer.steamRatingPercent,
                steamRatingText: offer.steamRatingText,
            }
        }

        /* Translated and Original Content*/
        const originalLangGenres = selectedGame.genres.map((e: Genre) => {
            return {
                name: e.name,
                id: e.id,
            }
        });

        const result = await translateAndStoreGameAction({
            gameId: `${selectedGame.id}`, description: selectedGame.description_raw, tags: selectedGame.tags, genres: selectedGame.genres
        });

        let developersAndPublishers: developerAndPublisherType = {};

        if (selectedGame.developers.length > 4) {
            developersAndPublishers.developers = selectedGame.developers.slice(0, 4);
        } else {
            developersAndPublishers.developers = selectedGame.developers ? selectedGame.developers : null;
        }

        if (selectedGame.publishers.length > 4) {
            developersAndPublishers.publishers = selectedGame.publishers.slice(0, 4);
        } else {
            developersAndPublishers.publishers = selectedGame.publishers ? selectedGame.developers : null;
        }

        const filteredData: gameData = {
            id: selectedGame.id,
            title: selectedGame.name,
            description: result.data.description ? result.data.description : selectedGame.description_raw,
            reviews: {
                meta_critic: {
                    metascore: selectedGame.metacritic ?? null,
                    link: selectedGame.metacritic_url ?? null,
                },
                rawGRating: {
                    ratingTop: selectedGame.rating_top ?? null,
                    rating_average: selectedGame.rating ?? null,
                    rating_count: selectedGame.ratings_count ?? null,
                    ratings_percentage: selectedGame.ratings ?? null,
                },
                steamRating: steamRating ? { ...steamRating } : null,
            },
            about_the_game: {
                esrb: selectedGame.esrb_rating ? selectedGame.esrb_rating.name : "No ESRB rating found",
                released_data: `${formatDateES(selectedGame.released)}`,
                publishers: selectedGame.publishers.map((e: publishersAndDevelopersType) => e.name),
                original_lang_genres: originalLangGenres,
                genres: result.data.genres,
                developers: selectedGame.developers.map((e: publishersAndDevelopersType) => e.name),
                tags: result.data.tags ? result.data.tags : selectedGame.tags.map((e: tag) => e.name),
                playtime: selectedGame.playtime > 0 ? selectedGame.playtime : null,
                website: selectedGame.website ? selectedGame.website : null,
                reddit: selectedGame.reddit_url ? selectedGame.reddit_url : null,
            },
            media_reviews: mediaReviews,
        };

        return filteredData;
    } catch (error) {
        console.error('Error fetching game data:', error);
        return null;
    }
});

export const getFranchiseGames = async (e: string) => {
    try {
        // Check if we have cached franchise data for this game
        const cachedGame = await checkGameCache(e);

        if (cachedGame && cachedGame.franchiseData) {

            // Check if franchise data is fresh (3 days for franchise data)
            const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;
            const timeSinceUpdate = new Date().getTime() - cachedGame.lastUpdated.getTime();
            const isFranchiseDataFresh = timeSinceUpdate < threeDaysInMs;

            if (isFranchiseDataFresh) {
                console.log(`📋 Franchise cache hit for game ${e}`);
                return cachedGame.franchiseData;
            }
        }

        const data = await cachedRawgFetch(`/games/${e}/game-series`);
        const currency = await getCurrency();

        const franchises = [];

        const filteredGameInfo = data.results.map((e: any) => ({
            title: e.name,
            released_date: e.released,
            header_image: e.background_image,
            link: createGameSlug(e.name),
        }));

        franchises.push(...filteredGameInfo.slice(0, 5));

        const getGameOffer = await Promise.all(
            franchises.map(async (e: any) => {
                const gameOffers = await searchOffers(e.title);
                let bestOffer: GameDealWithoutScore | null = null;

                if (gameOffers.length > 0) {
                    bestOffer = gameOffers.reduce((best: GameDealWithoutScore, current: GameDealWithoutScore) =>
                        parseFloat(current.savings) > parseFloat(best.savings) ? current : best
                    );
                }

                if (bestOffer !== null) {
                    const listOfStores = await searchForStore();

                    const store = listOfStores.find((e: GameDealWithoutScore) => e.storeID === bestOffer!.storeID);
                    const storeImage = storeLogos.find((e: StoreLogo) => e.name === store!.storeName);
                    const inCaseOfErrorImage = listOfStores[Number(inCaseOfError[0].storeID)];

                    // Format prices
                    (bestOffer as any).salePrice = formatPrice(Number(bestOffer.salePrice), currency);
                    (bestOffer as any).normalPrice = formatPrice(Number(bestOffer.normalPrice), currency);
                    (bestOffer as any).storeImage = storeImage ? storeImage : inCaseOfErrorImage;
                }

                return {
                    ...e,
                    offer: bestOffer,
                };
            })
        );

        // Cache the franchise data in the game document
        await updateGameWithFranchiseData(e, getGameOffer);

        return getGameOffer;
    } catch (error) {
        console.error('Error fetching franchise games:', error);
        return [];
    }
};

/* MAY BE YOU WILL LIKE TOO GAMES */

export const getSameGenre = async (e: number, gameID: number) => {
    try {
        const data = await cachedRawgGenreFetch(e, {
            page_size: 40
        });

        const maxOffersNumber = 10;
        const resultGames: VerticalCardWrapperType[] = [];

        const listOfStores = await searchForStore();
        const currency = await getCurrency();

        const platforms = {
            PC: "bi bi-display",
            Xbox: "bi bi-xbox",
            PlayStation: "bi bi-playstation",
        }

        for (const game of data.results) {
            // Si ya tenemos 10 juegos, cortamos
            if (resultGames.length >= maxOffersNumber) break;
            if (game.id === gameID) continue;

            const gameOffers = await searchOffers(game.name);

            // Saltar si no hay ofertas o si el juego es el mismo
            if (!gameOffers || gameOffers.length === 0) {
                continue
            }

            const validOffers = gameOffers.filter((offer: any) => offer.isOnSale === "1" && offer.gameID !== gameID);

            if (validOffers.length > 0) {
                const bestOffer = validOffers.reduce((best: GameDealWithoutScore, current: GameDealWithoutScore) =>
                    parseFloat(current.savings) > parseFloat(best.savings) ? current : best
                );

                const store = listOfStores.find((e: GameDealWithoutScore) => e.storeID === bestOffer.storeID);
                const storeImage = storeLogos.find((e: StoreLogo) => e.name === store.storeName);
                const inCaseOfErrorImage = listOfStores[Number(inCaseOfError[0].storeID)];

                resultGames.push({
                    title: game.name,
                    gameImage: game.background_image,
                    discount: `${Number(bestOffer.savings).toFixed(0)}%`,
                    oldPrice: `${formatPrice(Number(bestOffer.normalPrice), currency)}`,
                    currentPrice: `${formatPrice(Number(bestOffer.salePrice), currency)}`,
                    platform: platforms.PC,
                    webOffer: storeImage?.image ?? inCaseOfErrorImage,
                });
            }

            if (validOffers.length === 0) {
                continue;
            }
        }

        return resultGames;
    } catch (error) {
        console.error('Error fetching same genre games:', error);
        return [];
    }
};


