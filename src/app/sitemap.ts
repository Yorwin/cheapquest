import { MetadataRoute } from 'next';
import { createGameSlug } from '@/functions/functions';

function getSixYearsDateRange() {
    const today = new Date();

    const endYear = today.getFullYear();
    const endMonth = today.getMonth() + 1;

    const startYear = endYear - 6;
    const startMonth = endMonth;

    const pad = (n: number) => n.toString().padStart(2, '0');

    const rangeStart = `${startYear}-${pad(startMonth)}-01`;
    const rangeEnd = `${endYear}-${pad(endMonth)}-01`;

    return `${rangeStart},${rangeEnd}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://cheapquest.app';

    // Static URLs
    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/aviso-legal`,
            lastModified: new Date('2025-10-06'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/cookies`,
            lastModified: new Date('2025-10-06'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/politica-de-privacidad`,
            lastModified: new Date('2025-10-06'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/terminos`,
            lastModified: new Date('2025-10-06'),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Fetch dynamic game URLs (popular games from the last 5 years)
    const API_KEY = process.env.RAWG_API_KEY;
    const dynamicUrls: MetadataRoute.Sitemap = [];
    const targetGameCount = 30000; // Aim for at least 5000 games
    const maxPages = 80; // Limit to prevent excessive API calls
    const pageSize = 40; // RAWG max page_size

    if (API_KEY) {
        try {
            const dateRange = getSixYearsDateRange(); // e.g., '2018-10-01,2024-10-01'
            let page = 1;
            let totalFetched = 0;

            while (totalFetched < targetGameCount && page <= maxPages) {
                const response = await fetch(
                    `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&dates=${dateRange}&page_size=${pageSize}&page=${page}`
                );

                if (!response.ok) {
                    console.error(`Failed to fetch games for sitemap on page ${page}:`, response.statusText);
                    break;
                }

                const data = await response.json();

                if (!data.results || data.results.length === 0) {
                    // No more results
                    break;
                }

                for (const game of data.results) {
                    const slug = createGameSlug(game.name);
                    dynamicUrls.push({
                        url: `${baseUrl}/game-page/${slug}`,
                        lastModified: new Date(game.updated || game.released),
                        changeFrequency: 'weekly',
                        priority: 0.8,
                    });
                }

                totalFetched += data.results.length;
                page++;

                // Small delay to respect API rate limits
                if (page <= maxPages && totalFetched < targetGameCount) {
                    await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
                }
            }

            console.log(`Fetched ${totalFetched} games for sitemap across ${page - 1} pages`);
        } catch (error) {
            console.error('Error fetching games for sitemap:', error);
        }
    } else {
        console.warn('RAWG_API_KEY not found, skipping dynamic game URLs in sitemap');
    }

    const totalGamesInSitemap = dynamicUrls.length;
    console.log(`Total games in sitemap: ${totalGamesInSitemap} (including ${staticUrls.length} static URLs)`);

    return [...staticUrls, ...dynamicUrls];
}