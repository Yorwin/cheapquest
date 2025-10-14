import { NextRequest } from "next/server";
import { createGameSlug } from "@/functions/functions";
import { storeLogos } from "@/resources/stores_icons";
import { dealStoreData, StoreLogo } from "@/types/types";
import { cachedRawgFetch, cachedCheapSharkFetch } from "@/lib/api-cache-server";

const API_KEY = process.env.RAWG_API_KEY;

// 🔹 Obtener lista de tiendas una sola vez por request
async function getStoresList() {
    // For stores, we can keep using direct fetch since they change very rarely
    // and Next.js cache is sufficient
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
        // Use cached CheapShark fetch
        const data = await cachedCheapSharkFetch('/deals', {
            title,
            exact: 1,
            lowerPrice,
            upperPrice
        });

        return data;
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

        // --- construir query RAWG usando cache ---
        const rawgParams: Record<string, any> = { page_size: 10 };
        if (query) rawgParams.search = query;
        if (genres) rawgParams.genres = genres;
        if (metaCritic) rawgParams.metacritic = "75,100";

        const rawgData = await cachedRawgFetch('/games', rawgParams);

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
