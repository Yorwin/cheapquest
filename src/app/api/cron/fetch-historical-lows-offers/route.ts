import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { fetchGamesInfoCheapShark } from "@/functions/functions-server";
import { cachedRawgFetch } from "@/lib/api-cache-server";
import { gameOfferInfo, dealsInfoOffer } from "@/types/types";

export const GET = async () => {
    try {
        const historicalLows: any[] = [];
        let pageNumber = 0;
        const targetElements = 5;

        while (historicalLows.length < targetElements) {
            const requestAAAGames = await fetch(
                `https://www.cheapshark.com/api/1.0/deals?onSale=1&AAA=1&pageNumber=${pageNumber}&pageSize=40`
            );

            if (!requestAAAGames.ok) {
                console.error(`❌ Status: ${requestAAAGames.status}`);
                throw new Error("Error when trying to get AAA Games");
            }

            const AAAGamesData = await requestAAAGames.json();

            if (!AAAGamesData || AAAGamesData.length === 0) {
                console.log('⚠️ No hay más resultados en la API');
                break;
            }

            const gamesPrices = await fetchGamesInfoCheapShark(AAAGamesData);

            const filteredGames = gamesPrices.filter((game: gameOfferInfo) => {
                if (!game.cheapestPriceEver || !Array.isArray(game.deals) || game.deals.length === 0) {
                    return false;
                }

                const lowest = Number(game.cheapestPriceEver.price);
                const currentLowestDeal = Math.min(
                    ...game.deals.map((d: dealsInfoOffer) => Number(d.price))
                );

                return currentLowestDeal === lowest;
            });

            // Set con los títulos ya agregados
            const existingTitles = new Set(historicalLows.map(game => game.title));

            // CRÍTICO: Agrega títulos del lote actual para evitar duplicados dentro de la misma página
            const currentBatchTitles = new Set<string>();

            const completeDataPromises = filteredGames.map(async (game: gameOfferInfo) => {
                const title = game.info.title;

                // Saltar si ya existe en historicalLows O en el lote actual
                if (existingTitles.has(title) || currentBatchTitles.has(title)) {
                    return null;
                }

                // Marcar este título como "en proceso" inmediatamente
                currentBatchTitles.add(title);

                const bestDeal = game.deals.reduce((cheapest: dealsInfoOffer, current: dealsInfoOffer) => {
                    const cheapestPrice = Number(cheapest.price);
                    const currentPrice = Number(current.price);
                    return currentPrice < cheapestPrice ? current : cheapest;
                });

                try {
                    const gameInfo = await cachedRawgFetch('/games', { search: title });
                    const firstResult = gameInfo.results?.[0] ?? null;

                    return {
                        title: game.info.title,
                        steamAppID: game.info.steamAppID,
                        thumb: game.info.thumb,
                        cheapestPriceEver: {
                            price: game.cheapestPriceEver.price,
                            date: game.cheapestPriceEver.date
                        },
                        bestDeal: {
                            storeID: bestDeal.storeID,
                            dealID: bestDeal.dealID,
                            price: bestDeal.price,
                            retailPrice: bestDeal.retailPrice,
                            savings: bestDeal.savings
                        },
                        background_image: firstResult?.background_image || game.info.thumb,
                    };
                } catch (error) {
                    console.error(`❌ Error obteniendo info para ${title}:`, error);
                    return null; // Retornar null en caso de error
                }
            });

            const resolvedGames = await Promise.all(completeDataPromises);

            // Filtrar nulls y agregar juegos válidos
            const validGames = resolvedGames.filter(game => game !== null);

            historicalLows.push(...validGames);

            pageNumber++;

            // Límite de seguridad
            if (pageNumber > 50) {
                console.log('⚠️ Límite máximo de páginas alcanzado');
                break;
            }
        }

        const finalData = historicalLows.slice(0, targetElements);

        // Store in Firestore
        await db.collection("historicalLows").doc("latest").set({
            data: finalData,
            timestamp: new Date().toISOString(),
        });

        console.log(`✅ Historical lows updated with ${finalData.length} items`);
        return NextResponse.json({ message: "Historical lows updated", count: finalData.length });
    } catch (error) {
        console.error("❌ Cron error:", error);
        return NextResponse.json({ error: "Failed to update historical lows" }, { status: 500 });
    }
};

