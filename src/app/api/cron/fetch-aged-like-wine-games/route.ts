import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { GameDealWithoutScore } from "@/types/types";
import { cachedRawgFetch, cachedCheapSharkFetch } from "@/lib/api-cache-server";

export const GET = async () => {
    try {
        const today = new Date();
        const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())
            .toISOString().split('T')[0];

        let agedLikeWineGames: any[] = [];
        let allFoundOffers: GameDealWithoutScore[] = []; // Cache
        let page: number = 1;
        const targetCount: number = 8;
        const maxPages: number = 1;

        // Niveles de exigencia decrecientes
        const savingsLevels = [75, 60, 45, 25, 10];
        let currentSavingsLevel = 0;

        while (agedLikeWineGames.length < targetCount && currentSavingsLevel < savingsLevels.length) {
            const currentMinSavings = savingsLevels[currentSavingsLevel];

            // Si no es el primer nivel, primero revisar ofertas ya encontradas
            if (currentSavingsLevel > 0) {
                const reprocessedOffers = allFoundOffers.filter((offer: GameDealWithoutScore) => {
                    const valor = Math.trunc(Number(offer.savings));
                    return valor >= currentMinSavings;
                });

                if (reprocessedOffers.length > 0) {
                    // Obtener las mejores ofertas por juego de las ya encontradas
                    const gameOfferMap = new Map<string, GameDealWithoutScore>();

                    reprocessedOffers.forEach((offer: GameDealWithoutScore) => {
                        const gameKey = offer.title.toLowerCase().trim();
                        const existingOffer = gameOfferMap.get(gameKey);

                        if (!existingOffer ||
                            Math.trunc(Number(offer.savings)) > Math.trunc(Number(existingOffer.savings))) {
                            gameOfferMap.set(gameKey, offer);
                        }
                    });

                    const bestOffersFromCache = Array.from(gameOfferMap.values());
                    agedLikeWineGames.push(...bestOffersFromCache);
                    agedLikeWineGames = removeDuplicatesByBestPrice(agedLikeWineGames);

                    if (agedLikeWineGames.length >= targetCount) {
                        break;
                    }
                }
            }

            // Si aún necesitamos más juegos, hacer nuevas consultas
            page = currentSavingsLevel === 0 ? 1 : page; // Reset page solo en el primer nivel

            while (agedLikeWineGames.length < targetCount && page <= maxPages) {
                const data = await cachedRawgFetch('/games', {
                    dates: `1900-01-01,${fiveYearsAgo}`,
                    ordering: '-rating',
                    page_size: 60,
                    platforms: 1,
                    metacritic: '80,100',
                    page
                });
                const result = data.results;

                if (!result || result.length === 0) {
                    console.log(`No hay más juegos en la página ${page}`);
                    break;
                }

                const listOfOffers: GameDealWithoutScore[][] = [];

                // Buscar ofertas para cada juego de esta página
                for (let i = 0; i < result.length; i++) {
                    // Solo hacer la llamada si no hemos buscado este juego antes
                    const gameAlreadySearched = allFoundOffers.some(offer =>
                        offer.title.toLowerCase().includes(result[i].name.toLowerCase().substring(0, 10))
                    );

                    if (!gameAlreadySearched) {
                        try {
                            const lookForEachGameOffer = await cachedCheapSharkFetch('/deals', {
                                title: result[i].name,
                                exact: 1
                            });

                            // Guardar TODAS las ofertas encontradas para uso futuro
                            if (lookForEachGameOffer && lookForEachGameOffer.length > 0) {
                                allFoundOffers.push(...lookForEachGameOffer);
                            }

                            // Filtrar con el nivel actual de exigencia
                            const filterBestOffers = lookForEachGameOffer.filter((e: GameDealWithoutScore) => {
                                const valor = Math.trunc(Number(e.savings));
                                return valor >= currentMinSavings;
                            });

                            if (filterBestOffers.length > 0) {
                                listOfOffers.push(filterBestOffers);
                            }

                            // Pequeño delay para no saturar la API
                            await delay(100);
                        } catch (error) {
                            console.warn(`Error buscando ofertas para ${result[i].name}:`, error);
                        }
                    }
                }

                // Obtener la mejor oferta de cada juego
                const bestOffers = [];
                for (let i = 0; i < listOfOffers.length; i++) {
                    const gameBestOffer = listOfOffers[i].reduce((prev: GameDealWithoutScore, curr: GameDealWithoutScore) => {
                        const prevValue = Math.trunc(Number(prev.savings));
                        const currentValue = Math.trunc(Number(curr.savings));
                        return currentValue > prevValue ? curr : prev;
                    });

                    bestOffers.push(gameBestOffer);
                }

                // Agregar las nuevas ofertas al array principal
                agedLikeWineGames.push(...bestOffers);
                agedLikeWineGames = removeDuplicatesByBestPrice(agedLikeWineGames);

                //Verificar nro. de juegos encontrados.
                /* console.log(`Página ${page}: Encontrados ${agedLikeWineGames.length}/${targetCount} juegos`);*/

                page++;
            }

            // Si después de recorrer todas las páginas no tenemos suficientes juegos,
            // pasar al siguiente nivel de exigencia
            if (agedLikeWineGames.length < targetCount) {
                currentSavingsLevel++;
                if (currentSavingsLevel < savingsLevels.length) {

                    //Cambio de nivel del descueto.
                    /* console.log(`Cambiando a nivel de descuento: ${savingsLevels[currentSavingsLevel]}%`); */

                    page = 1; // Reset página para el nuevo nivel
                }
            } else {
                break; // Ya tenemos suficientes juegos
            }
        }

        // Verificar resultado final

        /* if (agedLikeWineGames.length < targetCount) {
            console.warn(`Solo se encontraron ${agedLikeWineGames.length} juegos de ${targetCount} deseados después de todos los niveles`);
        } else {
            console.log(`Búsqueda exitosa: ${agedLikeWineGames.length} juegos encontrados`);
        }
        */

        // Limitar a exactamente el número objetivo si tenemos más
        const finalResult = agedLikeWineGames.slice(0, targetCount);

        // Log final del nivel de descuento utilizado
        const usedLevel = Math.min(currentSavingsLevel, savingsLevels.length - 1);

        //Verificar resultado
        /* console.log(`Resultado final con nivel mínimo de descuento: ${savingsLevels[usedLevel]}%`); */

        // Store in Firestore
        await db.collection("agedLikeWineGames").doc("latest").set({
            data: finalResult,
            timestamp: new Date().toISOString(),
        });

        console.log(`✅ Aged like wine games updated with ${finalResult.length} items`);
        return NextResponse.json({ message: "Aged like wine games updated", count: finalResult.length });
    } catch (error) {
        console.error("❌ Cron error:", error);
        return NextResponse.json({ error: "Failed to update aged like wine games" }, { status: 500 });
    }
};

// Helper functions (copied from getOffers.tsx)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const searchOffers = async (e: string) => {
    try {
        const cleanGameNameForTag = e.toLowerCase().replace(/[^a-z0-9]/g, '-');

        const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${e}&exact=1`, {
            next: {
                revalidate: 1800,
                tags: ['game-deals',
                    `deal-${cleanGameNameForTag}`,
                    'cheapshark-api'],
            }
        });

        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('Rate limited by CheapShark API');
            }

            throw new Error(`CheapShark API Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`Error searching deals for "${e}":`, error);
        return []; // Devolver array vacío en lugar de undefined
    }
};

const removeDuplicatesByBestPrice = (offers: GameDealWithoutScore[]) => {
    const deduplicated: Record<string, GameDealWithoutScore> = {};

    offers.forEach((e: GameDealWithoutScore) => {
        const key = e.internalName;
        const currentSavings = parseFloat(e.savings);

        if (!deduplicated[key] || currentSavings > parseFloat(deduplicated[key].savings)) {
            deduplicated[key] = e;
        }
    });

    return Object.values(deduplicated);
};