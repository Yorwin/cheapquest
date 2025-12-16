const admin = require('firebase-admin');
const { onSchedule } = require("firebase-functions/v2/scheduler");
const Parser = require('rss-parser');
const axios = require('axios');

// --- INICIALIZACIÓN ---
admin.initializeApp();
const db = admin.firestore();

// --- CONFIGURACIÓN CLAVE: Inicialización de Parser con Custom Fields ---
// ¡¡CORRECCIÓN APLICADA AQUÍ!! Mapeando los nombres correctos del XML.
const parser = new Parser({
    customFields: {
        item: [
            // Precio con descuento (Discounted Price - YA ESTABA CORRECTO)
            ['discountPriceEUR', 'discountPriceEUR'],
            ['discountPriceUSD', 'discountPriceUSD'],

            // Precio Original (MSRP/PVP) -> Etiqueta real es <priceEUR>
            ['priceEUR', 'msrpEUR'],         // Mapea <priceEUR> a item.msrpEUR
            ['priceUSD', 'msrpUSD'],         // Mapea <priceUSD> a item.msrpUSD

            // Porcentaje de Descuento -> Etiqueta real es <discountPercentEUR>
            ['discountPercentEUR', 'discountPercentageEUR'], // Mapea a item.discountPercentageEUR
            ['discountPercentUSD', 'discountPercentageUSD'], // Mapea a item.discountPercentageUSD

            // Otros campos (sin cambios)
            ['publisher', 'publisher'],
            ['boximg', 'boximg'],
            ['platforms', 'platforms'],
        ]
    }
});
// ----------------------------------------------------------------------


// --- CONFIGURACIÓN DE RUTAS Y REFERIDO (Sin cambios) ---
const BASE_RSS_URL = 'https://www.indiegala.com/store_games_rss';
const REFERRAL_SUFFIX = '/?ref=yja4zgj';
const FIRESTORE_COLLECTION = 'commission_deals';
const FIRESTORE_DOC = 'IndieGala';
const DEALS_SUBCOLLECTION = 'deals';
const MAX_PAGES_TO_FETCH = 20;

// --- CONFIGURACIÓN DE REQUESTS (Sin cambios) ---
const REQUEST_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit=537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'application/rss+xml, application/xml, text/xml, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
};

const AXIOS_CONFIG = {
    headers: REQUEST_HEADERS,
    timeout: 30000,
    maxRedirects: 5
};

/**
 * Función auxiliar para reintentar requests con backoff exponencial
 */
async function retryRequest(fn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(`Intento ${attempt} falló, reintentando en ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

/**
 * Función auxiliar para construir la URL de la imagen.
 */
function extractImageUrl(item) {
    const IMAGE_BASE_URL = 'https://cdn.indiegala.com/';
    const relativePath = item.boximg || item['boximg'];

    if (relativePath && typeof relativePath === 'string') {
        return `${IMAGE_BASE_URL}${relativePath}`;
    }

    const contentText = item.content || item.contentSnippet || '';
    const imageMatch = contentText.match(/<img[^>]+src="([^">]+)"/);
    return imageMatch && imageMatch[1] ? imageMatch[1] : null;
}

exports.updateIndieGalaDeals = onSchedule({ schedule: "0 16 */2 * *", timeZone: "Europe/Madrid" }, async (event) => {
    console.log('--- Iniciando la actualización paginada de IndieGala ---');

    const docRef = db.collection(FIRESTORE_COLLECTION).doc(FIRESTORE_DOC);
    const dealsRef = docRef.collection(DEALS_SUBCOLLECTION);
    const batch = db.batch();
    let totalGamesProcessed = 0;
    let totalPages = 1;

    try {
        // 1. DETERMINAR EL TOTAL DE PÁGINAS DISPONIBLES
        const initialUrl = `${BASE_RSS_URL}?sale=true`;

        const response = await retryRequest(() => axios.get(initialUrl, AXIOS_CONFIG));
        const xmlTextInitial = response.data;

        const totalPagesMatch = xmlTextInitial.match(/<totalPages>(\d+)<\/totalPages>/);
        if (totalPagesMatch && totalPagesMatch[1]) {
            totalPages = parseInt(totalPagesMatch[1], 10);
            totalPages = Math.min(totalPages, MAX_PAGES_TO_FETCH);
            console.log(`Se encontraron ${totalPages} páginas con ofertas para procesar.`);
        } else {
            console.warn('No se encontró totalPages en el XML, usando 1 página por defecto');
        }

        // 2. LIMPIEZA DE DATOS (Eliminar todas las ofertas antiguas)
        const oldDealsSnapshot = await dealsRef.get();
        oldDealsSnapshot.docs.forEach(doc => batch.delete(doc.ref));
        console.log(`Se marcaron para borrar ${oldDealsSnapshot.docs.length} ofertas antiguas.`);

        // --- FIX: ACTUALIZACIÓN DEL DOCUMENTO PADRE (Para que exista) ---
        batch.set(docRef, {
            last_updated: admin.firestore.FieldValue.serverTimestamp(),
            status: 'running',
            source_name: 'IndieGala Store Deals',
            total_items: totalGamesProcessed,
        }, { merge: true });
        // --- FIN FIX ---

        // 3. PROCESAR CADA PÁGINA
        for (let page = 1; page <= totalPages; page++) {
            const pageUrl = `${BASE_RSS_URL}?page=${page}&sale=true`;
            console.log(`Procesando página ${page}/${totalPages}...`);

            let pageXmlText;
            try {
                const response = await retryRequest(() => axios.get(pageUrl, AXIOS_CONFIG));
                pageXmlText = response.data;
            } catch (fetchError) {
                console.error(`Error de red (fetch) en página ${page}:`, fetchError.message);
                continue;
            }

            let feed;
            try {
                let cleanedXmlText = pageXmlText.replace('<browse>', '').replace('</browse>', '');
                feed = await parser.parseString(cleanedXmlText);
            } catch (parseError) {
                console.error(`Error de parseo (XML) en página ${page}:`, parseError.message);
                continue;
            }

            console.log(`Feed obtenido para página ${page}:`, { title: feed?.title, itemsCount: feed?.items?.length || 0, feedKeys: Object.keys(feed || {}) });

            if (!feed || !feed.items || !Array.isArray(feed.items) || feed.items.length === 0) {
                console.warn(`Feed inválido o sin items para página ${page}.`);
                continue;
            }

            feed.items.forEach(item => {
                const originalLink = item.link.split('?')[0];
                const referralLink = `${originalLink}${REFERRAL_SUFFIX}`;

                // --- EXTRACCIÓN DE PRECIOS Y MONEDA (USANDO LOS NOMBRES CORREGIDOS) ---

                // Precios con descuento (discountPriceEUR/USD)
                const priceEUR = item.discountPriceEUR ? parseFloat(item.discountPriceEUR) : null;
                const priceUSD = item.discountPriceUSD ? parseFloat(item.discountPriceUSD) : null;

                // Precios originales (MSRP/PVP) -> Ahora item.msrpEUR/USD gracias al mapeo en el parser
                const msrpEUR = item.msrpEUR ? parseFloat(item.msrpEUR) : null;
                const msrpUSD = item.msrpUSD ? parseFloat(item.msrpUSD) : null;

                // Porcentaje de descuento -> Ahora item.discountPercentageEUR/USD gracias al mapeo
                const discountPercentageEUR = item.discountPercentageEUR ? parseInt(item.discountPercentageEUR, 10) : null;
                const discountPercentageUSD = item.discountPercentageUSD ? parseInt(item.discountPercentageUSD, 10) : null;

                let finalPrice = null;
                let finalMSRP = null;
                let finalDiscountPercentage = null; // <-- Nuevo
                let finalCurrency = null;

                // Lógica de Moneda: Priorizar EUR
                if (priceEUR) {
                    finalPrice = priceEUR;
                    finalMSRP = msrpEUR;
                    finalDiscountPercentage = discountPercentageEUR; // <-- Usar el % EUR
                    finalCurrency = 'EUR';
                } else if (priceUSD) {
                    finalPrice = priceUSD;
                    finalMSRP = msrpUSD;
                    finalDiscountPercentage = discountPercentageUSD; // <-- Usar el % USD
                    finalCurrency = 'USD';
                }

                // --- IMAGEN ---
                const image_url = extractImageUrl(item);

                // --- PLATAFORMAS (Lógica de aplanamiento sin cambios) ---
                const rawPlatforms = item.platforms;
                let platforms = [];

                if (Array.isArray(rawPlatforms)) {
                    platforms = rawPlatforms.flatMap(p => {
                        if (Array.isArray(p)) {
                            return p.map(innerP => (innerP && innerP.platform) ? innerP.platform : null);
                        } else if (typeof p === 'object' && p !== null && p.platform) {
                            return p.platform;
                        }
                        return null;
                    }).filter(Boolean);
                }

                // ------------------------------------------------------------------

                const dealData = {
                    title: item.title || null,
                    summary: item.contentSnippet || item.product || null,

                    referral_url: referralLink,

                    price: finalPrice,
                    msrp: finalMSRP,
                    discount_percentage: finalDiscountPercentage, // <-- Usando el valor ya resuelto
                    currency: finalCurrency,

                    image_url: image_url,

                    platforms: platforms,
                    publisher: item.publisher || null,

                    original_url: originalLink,
                    pubDate: item.discountStart ? new Date(item.discountStart) : (item.date ? new Date(item.date) : admin.firestore.FieldValue.serverTimestamp()),
                };

                const docId = Buffer.from(originalLink).toString('base64');
                batch.set(dealsRef.doc(docId), dealData);
                totalGamesProcessed++;
            });

            if (page < totalPages) {
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        }

        // --- ACTUALIZACIÓN FINAL DEL DOCUMENTO PADRE ANTES DEL COMMIT ---
        batch.update(docRef, {
            status: 'success',
            total_items: totalGamesProcessed
        });
        // ----------------------------------------------------------------

        // 4. EJECUTAR ESCRITURAS MASIVAS (Batch Commit)
        await batch.commit();
        console.log(`¡Proceso finalizado con éxito! Total de ${totalGamesProcessed} ofertas guardadas en Firestore.`);

        return null;
    } catch (error) {
        console.error('ERROR CRÍTICO en la función IndieGala:', error);

        // --- Manejo de Error: Si falla, actualizar el estado a 'error' ---
        try {
            await docRef.update({
                status: 'error',
                last_error_time: admin.firestore.FieldValue.serverTimestamp(),
                last_error_message: error.message || 'Unknown error during update.'
            });
        } catch (updateError) {
            console.error('Fallo al actualizar el estado de error en Firestore:', updateError);
        }
        // ------------------------------------------------------------------

        throw new Error('Fallo en la actualización del feed de IndieGala. Revise los logs.');
    }
});