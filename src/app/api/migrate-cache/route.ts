import { NextResponse } from "next/server";
import { cachedRawgFetch, cachedCheapSharkFetch } from "@/lib/api-cache-server";

export const GET = async () => {
    try {
        console.log("🚀 Starting cache migration...");

        // Popular games from RAWG for initial cache
        const popularGames = [
            "The Witcher 3: Wild Hunt",
            "The Legend of Zelda: Breath of the Wild",
            "Red Dead Redemption 2",
            "God of War",
            "The Last of Us Part II",
            "Cyberpunk 2077",
            "Elden Ring",
            "Hades",
            "Hollow Knight",
            "Celeste"
        ];

        console.log("📥 Migrating popular games to cache...");

        // Migrate popular games
        for (const gameName of popularGames) {
            try {
                console.log(`Processing: ${gameName}`);
                await cachedRawgFetch('/games', { search: gameName });

                // Also fetch offers for this game
                await cachedCheapSharkFetch('/deals', {
                    title: gameName,
                    exact: 1,
                    onSale: 1
                });

                // Small delay to avoid overwhelming APIs
                await new Promise(resolve => setTimeout(resolve, 1000));
            } catch (error) {
                console.warn(`Failed to migrate ${gameName}:`, error);
            }
        }

        // Get some popular deals to cache
        console.log("📥 Migrating popular deals to cache...");
        await cachedCheapSharkFetch('/deals', {
            sortBy: 'DealRating',
            onSale: 1
        });

        console.log("✅ Cache migration completed successfully!");
        return NextResponse.json({
            message: "Cache migration completed",
            migratedGames: popularGames.length
        });

    } catch (error) {
        console.error("❌ Cache migration failed:", error);
        return NextResponse.json({
            error: "Failed to migrate cache"
        }, { status: 500 });
    }
};