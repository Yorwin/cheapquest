import { NextRequest } from "next/server";
import { createGameSlug } from "@/functions/functions";
import { storeLogos } from "@/resources/stores_icons";
import { dealStoreData, StoreLogo } from "@/types/types";

const API_KEY = process.env.RAWG_API_KEY;

// 🔹 Obtener lista de tiendas una sola vez por request
async function getStoresList() {
    const res = await fetch("https://www.cheapshark.com/api/1.0/stores", {
        next: { revalidate: 1209600, tags: ["stores-list"] }, // 14 días
    });

    if (!res.ok) throw new Error("Error fetching stores from CheapShark");

    const stores = await res.json();

    return stores;
}

// --- función para consultar CheapShark ---
async function searchOffers(title: string, lowerPrice: number, upperPrice: number) {
    try {
        const cleanGameNameForTag = title.toLowerCase().replace(/[^a-z0-9]/g, "-");

        const response = await fetch(
            `https://www.cheapshark.com/api/1.0/deals?title=${title}&exact=1&lowerPrice=${lowerPrice}&upperPrice=${upperPrice}`,
            {
                next: {
                    revalidate: 1800,
                    tags: [
                        "game-deals",
                        `deal-${cleanGameNameForTag}`,
                        "cheapshark-api",
                    ],
                },
            }
        );

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error("Rate limited by CheapShark API");
            }
            throw new Error(
                `CheapShark API Error: ${response.status} - ${response.statusText}`
            );
        }

        return await response.json();
    } catch (error) {
        console.error(`Error searching deals for "${title}":`, error);
        return [];
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const query = searchParams.get("query") || "";
        const genres = searchParams.get("genres") || "";
        const order = searchParams.get("order") || "precio-min";
        const metaCritic = searchParams.get("meta-critic") === "true";
        const startingPrice = parseInt(searchParams.get("starting-price") || "0");
        const finishingPrice = parseInt(searchParams.get("finishing-price") || "200");

        // --- construir query RAWG ---
        let rawgUrl = `https://api.rawg.io/api/games?key=${API_KEY}&page_size=10`;
        if (query) rawgUrl += `&search=${query}`;
        if (genres) rawgUrl += `&genres=${genres}`;
        if (metaCritic) rawgUrl += "&metacritic=75,100"; // ejemplo

        const rawgResponse = await fetch(rawgUrl, {
            next: { revalidate: 3600 }, // cache 1h
        });

        if (!rawgResponse.ok) {
            throw new Error("Error al obtener datos de RAWG");
        }

        const rawgData = await rawgResponse.json();

        //Obtener información de tiendas
        const storeMap = await getStoresList();

        // --- Enriquecer cada juego con CheapShark ---
        const enrichedGames = await Promise.all(
            rawgData.results.map(async (game: any) => {
                const offers = await searchOffers(game.name, startingPrice, finishingPrice);

                let bestOffer: any = null;

                if (offers && offers.length > 0) {
                    bestOffer = offers.reduce((best: any, current: any) =>
                        parseFloat(current.savings) > parseFloat(best.savings) ? current : best
                    );

                    const bestDealStore = storeMap.find((e: dealStoreData) => e.storeID === bestOffer.storeID);
                    const bestDealstoreImage = storeLogos.find((e: StoreLogo) => e.name === bestDealStore.storeName);

                    if (bestOffer.storeID) {
                        bestOffer = {
                            ...bestOffer,
                            storeName: bestOffer.storeID,
                            storeImage: bestDealstoreImage,
                        };
                    }
                }

                return {
                    id: game.id,
                    title: game.name,
                    released_date: game.released,
                    header_image: game.background_image,
                    rating: game.metacritic,
                    slug: game.slug,
                    link: createGameSlug(game.name),
                    bestOffer: bestOffer
                        ? {
                            salePrice: bestOffer.salePrice,
                            normalPrice: bestOffer.normalPrice,
                            savings: bestOffer.savings,
                            storeID: bestOffer.storeID,
                            dealID: bestOffer.dealID,
                            storeImage: bestOffer.storeImage,
                            storeName: bestOffer.storeName,
                        }
                        : null,
                };
            })
        );

        // ordenar por precio solo entre los que tienen ofertas
        let sortedGames = enrichedGames;
        if (order === "precio-min") {
            sortedGames = enrichedGames.sort((a: any, b: any) => {
                const priceA = a.bestOffer ? parseFloat(a.bestOffer.salePrice) : Infinity;
                const priceB = b.bestOffer ? parseFloat(b.bestOffer.salePrice) : Infinity;
                return priceA - priceB;
            });
        } else if (order === "precio-max") {
            sortedGames = enrichedGames.sort((a: any, b: any) => {
                const priceA = a.bestOffer ? parseFloat(a.bestOffer.salePrice) : 0;
                const priceB = b.bestOffer ? parseFloat(b.bestOffer.salePrice) : 0;
                return priceB - priceA;
            });
        }

        return Response.json({ results: sortedGames }, { status: 200 });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Error desconocido en el servidor";
        return Response.json({ error: message }, { status: 500 });
    }
}
