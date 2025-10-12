import { NextRequest, NextResponse } from 'next/server';
import { getGameOffers } from '@/utils/getGamesInfo';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ game: string }> }
) {
    try {
        const { game } = await params;
        const gameName = decodeURIComponent(game);

        const offers = await getGameOffers(gameName);

        return NextResponse.json(offers);
    } catch (error) {
        console.error('Error fetching game offers:', error);
        return NextResponse.json(
            { error: 'Failed to fetch game offers' },
            { status: 500 }
        );
    }
}