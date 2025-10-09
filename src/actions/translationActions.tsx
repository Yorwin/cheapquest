'server-only'

import { db } from "@/lib/firebase-admin";
import { arrayTranslation, Translator } from "@/utils/translation";
import { translationType } from "@/types/types";

export async function translateAndStoreGameAction({
    gameId,
    description,
    genres,
    tags,
}: translationType): Promise<{ data: translationType; fromCache: boolean }> {

    /* Error boundary*/
    if (!gameId || typeof gameId !== 'string' || gameId.trim() === '') {
        throw new Error('gameId is required and must be a non-empty string');
    }

    /* Comprobar base de datos */
    const docRef = db.collection("translations_for_each_game").doc(gameId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
        return {
            data: docSnap.data() as translationType,
            fromCache: true
        };
    }

    /* Añadir nuevo juego si en la comprobación no se encontro nada */

    const gameData: translationType = { gameId: gameId };

    if (description) {
        gameData.description = await Translator(description);
    }
    if (tags) {
        gameData.tags = await arrayTranslation(tags);
    }
    if (genres && genres.length > 0) {
        const translatedGenres = await arrayTranslation(genres);
        gameData.genres = translatedGenres.filter((g) => g && g.trim() !== "");
    }

    await docRef.set(gameData);
    return { data: gameData, fromCache: false };
}