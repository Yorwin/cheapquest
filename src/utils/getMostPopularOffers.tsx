import "server-only";

function getTop11Deals(deals: any) {
    const now = Date.now() / 1000; // Timestamp actual

    return deals
        .map((deal: any) => {
            // Convertir a números
            const savings = parseFloat(deal.savings || 0);
            const reviews = parseInt(deal.steamRatingCount || 0);
            const rating = parseInt(deal.steamRatingPercent || 0);
            const releaseDate = parseInt(deal.releaseDate || 0);

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
        .sort((a: any, b: any) => b.finalScore - a.finalScore) // Ordenar por score descendente
        .slice(0, 11); // Tomar los primeros 11
}

export const getMostPopularOffers = async () => {

    const responseOffers = await fetch("https://www.cheapshark.com/api/1.0/deals?sortBy=DealRating", {
        cache: "default"
    });

    if (!responseOffers.ok) {
        throw new Error("Failed to fetch data");
    }

    const response = await responseOffers.json();

    const deduplicated: any = {};

    response.forEach((e: any) => {
        const key = e.internalName;
        const currentSavings = parseFloat(e.savings);

        if (!deduplicated[key] || currentSavings > parseFloat(deduplicated[key].savings)) {
            deduplicated[key] = e;
        }
    })

    const resultArray = Object.values(deduplicated);

    const sortedByRelease = resultArray.sort((a: any, b: any) => b.releaseDate - a.releaseDate);
    const getDeals = getTop11Deals(resultArray);

    return getDeals;
};

export const getNewDeals = async () => {

    const response = await fetch("https://www.cheapshark.com/api/1.0/deals?maxAge=12&onSale=1&sortBy=DealRating", {
        cache: "force-cache"
    })

    if(!response.ok) {
        throw new Error("Error when trying to fetch new offers");
    }

    const data = await response.json();
    const newDeals = data.slice(0, 10);

    return newDeals;
};

export const searchOffers = async (e : any) => {
    
    const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?title=${e}`, {
        cache: "force-cache"
    });

    if(!response.ok) {
        throw new Error("Error when trying to search for a deal for this game");
    }

    const data = await response.json();

    return data
};

