import { setDoc, doc } from "firebase/firestore"
import { db } from "./firebase"

/* Agregar Traducción */

export interface translationType {
    id: string,
    description?: string,
    genres?: string[],
    tags?: string[],
}

export const addGameTranslation = async (e: translationType) => {
    try {
        await setDoc(doc(db, "translations_for_each_game", `${e.id}`), {
            gameId: e.id,
            description: e.description,
            genres: e.genres,
            tags: e.tags
        })
    } catch (e) {
        console.error("Error al agregar el documento", e)
    }
};