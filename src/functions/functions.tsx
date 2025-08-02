import { StaticImageData } from "next/image";

export function getThreeYearsDateRange() {
    const today = new Date();

    const endYear = today.getFullYear();
    const endMonth = today.getMonth() + 1;

    const startYear = endYear - 5;
    const startMonth = endMonth;

    const pad = (n: number) => n.toString().padStart(2, '0');

    const rangeStart = `${startYear}-${pad(startMonth)}-01`;
    const rangeEnd = `${endYear}-${pad(endMonth)}-01`;

    return `${rangeStart},${rangeEnd}`;
}

export function calculatePopularityScore(game: any): number {
    const {
        added_by_status = {},
        released,
        added = 0,
        metacritic = 0,
        reviews_count = 0,
        ratings_count = 0,
        rating = 0,
        rating_top = 5
    } = game;

    // Seguridad en caso de que falten valores
    const beaten = added_by_status.beaten || 0;
    const playing = added_by_status.playing || 0;

    // 1. Engagement Score: completados y jugando
    const engagement = beaten + playing;

    // 2. Rating Score ponderado por cantidad
    const ratingRatio = ratings_count > 0 ? rating / rating_top : 0;
    const weightedRating = ratingRatio * Math.log10(ratings_count + 1); // log para evitar inflar con miles

    // 3. Fecha de lanzamiento (más nuevo = más puntos)
    const releaseDate = released ? new Date(released) : null;
    let releaseScore = 1; // Default mínimo
    if (releaseDate) {
        const ageInYears = (Date.now() - releaseDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
        releaseScore = Math.max(0, 1 - (ageInYears / 10)); // 1 si es nuevo, 0 si tiene >10 años
    }

    // 4. Normalización y pesos
    const norm = (value: number, max: number) => Math.min(value / max, 1);

    const score =
        norm(engagement, 1000) * 30 +           // 30% del peso
        norm(added, 50000) * 15 +               // 15% del peso
        norm(metacritic, 100) * 20 +             // 20% del peso
        norm(reviews_count, 1000) * 10 +        // 10%
        norm(weightedRating, 5) * 20 +           // 20%
        releaseScore * 5;                        // 5%

    return Math.round(Math.min(score, 100));
}

export function getTitlePrefix(title: string, length = 20) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9 ]/gi, '')  // elimina símbolos como ":" o "-"
        .substring(0, length)
        .trim();
}

export interface RawgGame {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: StaticImageData;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus;
    metacritic: number | null;
    playtime: number;
    suggestions_count: number;
    updated: string;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: PlatformWrapper[];
    parent_platforms: PlatformWrapper[];
    genres: Genre[];
    tags: Tag[];
    esrb_rating: ESRBRating | null;
    short_screenshots: Screenshot[];
    stores: StoreEntry[];
    clip: null;
    score: null;
}

export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface AddedByStatus {
    yet?: number;
    owned?: number;
    beaten?: number;
    toplay?: number;
    dropped?: number;
    playing?: number;
}

export interface PlatformWrapper {
    platform: {
        id: number;
        name: string;
        slug: string;
    };
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
}

export interface Tag {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
}

export interface ESRBRating {
    id: number;
    name: string;
    slug: string;
    name_en: string;
    name_ru: string;
}

export interface Screenshot {
    id: number;
    image: string;
}

export interface StoreEntry {
    id: number;
    store: {
        id: number;
        name: string;
        slug: string;
    };
}

export function filterUniqueGames(games: RawgGame[]): RawgGame[] {
    const gameMap: Record<string, RawgGame> = {};

    for (const game of games) {
        const prefix = getTitlePrefix(game.name);

        if (!gameMap[prefix]) {
            gameMap[prefix] = game;
        } else {
            const existing = gameMap[prefix];

            if (game.added > existing.added) {
                gameMap[prefix] = game;
            } else if (game.added === existing.added) {
                const updatedA = new Date(game.updated);
                const updatedB = new Date(existing.updated);

                if (updatedA > updatedB) {
                    gameMap[prefix] = game;
                }
            }
        }
    }

    return Object.values(gameMap);
}