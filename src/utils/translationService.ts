// services/translationService.ts
import { translationType } from '@/firebase/translations';

interface TranslateGameParams {
    gameId: string;
    description?: string;
    genres?: string[];
    tags?: string[];
}

interface TranslationResponse {
    data: translationType;
    fromCache: boolean;
}

export const translationService = {
    async translateGame(params: TranslateGameParams): Promise<TranslationResponse> {
        const response = await fetch('/api/translations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }

        return result;
    }
};