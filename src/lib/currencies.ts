// lib/currencies.ts
import { cookies } from 'next/headers';

export async function getCurrency() {
    const cookieStore = await cookies();
    return cookieStore.get('user-currency')?.value || 'USD';
}

export function formatPrice(amount: number, currency: string) {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: currency,
    }).format(amount);
}