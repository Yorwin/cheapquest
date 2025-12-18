// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Definimos la interfaz para la propiedad geo
interface NextRequestWithGeo extends NextRequest {
    geo?: {
        city?: string
        country?: string
        region?: string
        latitude?: string
        longitude?: string
    }
}

const EURO_ZONE = ['AT', 'BE', 'HR', 'CY', 'EE', 'FI', 'FR', 'DE', 'GR', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PT', 'SK', 'SI', 'ES', 'AD', 'MC', 'SM', 'VA', 'ME', 'XK'];

export function middleware(request: NextRequestWithGeo) {
    // 1. Obtenemos el país (Vercel detecta esto por IP)
    const country = request.geo?.country || 'US';

    // 2. Definimos la moneda basada en el país
    const currency = EURO_ZONE.includes(country) ? 'EUR' : 'USD';

    // 3. Creamos la respuesta y seteamos una cookie
    const response = NextResponse.next();

    // Solo seteamos la cookie si no existe para no sobreescribir preferencias manuales
    if (!request.cookies.has('user-currency')) {
        response.cookies.set('user-currency', currency, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7, // 1 semana
        });
    }

    return response;
}

// Opcional: Solo ejecutar en páginas, no en archivos estáticos o imágenes
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};