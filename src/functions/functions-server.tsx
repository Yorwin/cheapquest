import { GameDealWithoutScore } from "@/types/types";
import { cachedCheapSharkFetch } from "@/lib/api-cache-server";

// utilitario para dormir
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchGamesInfoCheapShark = async (gamesData: GameDealWithoutScore[]) => {
    const gamesPrices = [];
    const chunkSize = 5;       // nº de requests paralelas por batch
    const delayBetweenChunks = 0; // ms entre batches
    const delayBetweenCalls = 0;   // ms entre llamadas dentro del batch (opcional)

    for (let i = 0; i < gamesData.length; i += chunkSize) {
        const chunk = gamesData.slice(i, i + chunkSize);

        const results = [];
        for (let j = 0; j < chunk.length; j++) {
            const { gameID } = chunk[j];
            try {
                const data = await cachedCheapSharkFetch('/games', { id: gameID });
                if (data) {
                    results.push(data);
                } else {
                    console.warn(`No data for gameID ${gameID}`);
                }
            } catch (err) {
                console.error(`Error fetching gameID ${gameID}:`, err);
            }

            // delay entre cada request en el mismo chunk
            if (j < chunk.length - 1) {
                await sleep(delayBetweenCalls);
            }
        }

        gamesPrices.push(...results);

        // delay entre chunks
        if (i + chunkSize < gamesData.length) {
            await sleep(delayBetweenChunks);
        }
    }

    return gamesPrices;
};