'use server'

import admin from "firebase-admin";
import { arrayTranslation, Translator } from "@/utils/translation";
import { translationType } from "@/firebase/translations";

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
}

const db = admin.firestore();

export async function translateAndStoreGameAction({
    gameId,
    description,
    genres,
    tags,
}: {
    gameId: string;
    description?: string;
    genres?: string[];
    tags?: string[];
}): Promise<{ data: translationType; fromCache: boolean }> {
    if (!gameId || typeof gameId !== 'string' || gameId.trim() === '') {
        throw new Error('gameId is required and must be a non-empty string');
    }

    const docRef = db.collection("translations_for_each_game").doc(gameId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
        return {
            data: docSnap.data() as translationType,
            fromCache: true
        };
    }

    const gameData: translationType = { id: gameId };

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