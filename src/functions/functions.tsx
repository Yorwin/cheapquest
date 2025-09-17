import { StaticImageData } from "next/image";
import { RawgGame, GameDeal, GameDealWithoutScore } from "@/types/types";

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

export function calculatePopularityScore(game: RawgGame): number {

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

export function getTop11Deals(deals: GameDealWithoutScore[]) {

    const now = Date.now() / 1000; // Timestamp actual
    const dealsWithScore = deals.map((deal: GameDealWithoutScore) => {

        // Convertir a números
        const savings: number = deal.savings ? parseFloat(deal.savings) : 0;
        const reviews: number = deal.steamRatingCount ? parseInt(deal.steamRatingCount) : 0;
        const rating: number = deal.steamRatingPercent ? parseInt(deal.steamRatingPercent) : 0;
        const releaseDate: number = deal.releaseDate ? deal.releaseDate : 0;

        // Calcular score simple (0-100)
        let score = 0;

        // Ahorro (0-40 puntos) - más ahorro = más puntos
        score += (savings / 100) * 40;

        // Popularidad (0-35 puntos) - más reviews y mejor rating = más puntos
        if (reviews > 0 && rating > 0) {
            const popularityBonus = Math.min(Math.log10(reviews), 5) / 5; // Max 5 puntos por reviews
            score += (rating / 100) * 25 + popularityBonus * 10;
        }

        // Recencia (0-25 puntos) - juegos más nuevos = más puntos
        if (releaseDate > 0) {
            const yearsOld = (now - releaseDate) / (365 * 24 * 60 * 60);
            if (yearsOld <= 2) score += 25;
            else if (yearsOld <= 5) score += 15;
            else if (yearsOld <= 10) score += 10;
            else score += 5;
        }

        return {
            ...deal,
            finalScore: score
        };
    })

    const result: GameDeal[] = dealsWithScore.sort((a: GameDeal, b: GameDeal) => b.finalScore - a.finalScore).slice(0, 11);

    return result;
}

export function removeDuplicatesByBestPrice(deals: GameDeal[]): GameDeal[] {
    const gameMap = new Map<string, GameDeal>();

    for (const deal of deals) {
        // Usamos los primeros 15 caracteres del título como clave
        const titlePrefix = deal.title.substring(0, 15).toLowerCase();
        const existingDeal = gameMap.get(titlePrefix);

        if (!existingDeal) {
            // Si no existe, lo agregamos
            gameMap.set(titlePrefix, deal);
        } else {
            // Si existe, comparamos precios y nos quedamos con el mejor
            const currentPrice = parseFloat(deal.salePrice);
            const existingPrice = parseFloat(existingDeal.salePrice);

            if (currentPrice < existingPrice) {
                // El precio actual es mejor (menor), reemplazamos
                gameMap.set(titlePrefix, deal);
            }
            // Si el precio existente es mejor o igual, no hacemos nada
        }
    }

    return Array.from(gameMap.values());
}

// Función para crear URLs amigables
export const createGameSlug = (gameName: string): string => {
    return gameName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
        .replace(/\s+/g, '-')         // Espacios por guiones
        .replace(/-+/g, '-')          // Múltiples guiones por uno
        .trim();
};

// Función para convertir slug de vuelta a nombre
export const slugToGameName = (slug: string): string => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/* Función para formatear el Released Data */
export const formatDateES = (isoDate: string) => {
    return new Intl.DateTimeFormat("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(isoDate));
};

export const getTimeSinceRelease = (releaseDate: number) => {
    const now = Date.now(); // en ms
    const releaseTime = releaseDate * 1000; // convertir segundos -> ms
    const diff = now - releaseTime;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days >= 1) {
        return `${days} día${days > 1 ? "s" : ""}`;
    } else {
        return `${hours} hora${hours > 1 ? "s" : ""}`;
    }
};
