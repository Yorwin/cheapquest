// lib/currencies.ts
import { cookies } from 'next/headers';

export async function getCurrency() {
    const cookieStore = await cookies();
    return cookieStore.get('user-currency')?.value || 'USD';
}

export function formatPrice(amount: number, currency: string) {
    if (currency === 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        }).format(amount);
    } else if (currency === 'EUR') {
        const formatted = new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'EUR',
        }).format(amount);
        return formatted.replace(/\s+€$/, '€');
    }

    // Fallback
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}