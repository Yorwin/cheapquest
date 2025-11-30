# Implementación de ISR y Mejoras de Caché

## Fecha: 2025-11-30

## Problema Identificado

El sitio estaba recibiendo errores **403 Forbidden** de CheapShark API en producción (Vercel) pero no en local. 

### Causa Raíz
El problema fue causado por **crawling excesivo de bots** (Google, Bing, etc.) debido a:
- Sitemap con 30,000 URLs de juegos
- Múltiples peticiones simultáneas a CheapShark en cada carga del homepage
- IPs compartidas de Vercel siendo bloqueadas por rate limiting de CheapShark
- Caché de Firebase expirando después de 1 día

## Soluciones Implementadas

### 1. ISR (Incremental Static Regeneration) en Homepage

**Archivo modificado:** `src/app/page.tsx`

```typescript
export const revalidate = 3600; // Revalidate every 1 hour
```

**Beneficios:**
- La página se regenera cada hora en lugar de en cada petición
- Los bots reciben contenido estático pre-renderizado
- Reduce drásticamente las peticiones a CheapShark API
- Mejora el rendimiento general del sitio

### 2. Sistema de Fallback a Caché Vieja

**Archivos modificados:**
- `src/lib/firebase-cache.ts` - Agregado parámetro `ignoreFreshness`
- `src/lib/api-cache-server.ts` - Implementado fallback en errores 403/429

**Características:**
- Cuando CheapShark devuelve 403 o 429, el sistema intenta usar caché vieja
- Logs informativos para debugging:
  - ✅ Cache hit
  - ⚠️ API blocked, trying stale cache
  - 📦 Using stale cache
  - ❌ Fetch failed
- User-Agent personalizado para identificarse como aplicación legítima

**Flujo de Fallback:**
1. Intenta obtener caché fresca (< 1 día)
2. Si no hay caché, hace petición a CheapShark
3. Si CheapShark devuelve 403/429, usa caché vieja (ignorando freshness)
4. Si todo falla, lanza error

### 3. Mejoras en el Manejo de Errores

```typescript
try {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'CheapQuest/1.0 (https://cheapquest.app)',
    }
  })
  
  if (response.status === 403 || response.status === 429) {
    // Fallback a caché vieja
    const staleCache = await checkDealSearchCache(params.title, true)
    if (staleCache) return staleCache
  }
} catch (error) {
  // Emergency fallback
  const staleCache = await checkDealSearchCache(params.title, true)
  if (staleCache) return staleCache
  throw error
}
```

## Próximos Pasos Recomendados

### Corto Plazo
1. **Reducir el sitemap** de 30,000 a ~1,000 URLs más importantes
2. **Agregar Crawl-delay** en `robots.txt`
3. **Monitorear logs** de Vercel para verificar la reducción de errores 403

### Medio Plazo
1. **Implementar Cron Job** para pre-cachear datos del homepage cada 30 minutos
2. **Aumentar duración de caché** de deals de 1 día a 3 días
3. **Implementar rate limiting interno** para peticiones a CheapShark

### Largo Plazo
1. **Sistema de cola** para peticiones a CheapShark con delays
2. **Caché distribuida** con Redis para mejor rendimiento
3. **Monitoreo y alertas** para detectar bloqueos tempranamente

## Impacto Esperado

- ✅ Reducción del 80-90% en peticiones a CheapShark desde homepage
- ✅ Eliminación de errores 403 para usuarios y bots
- ✅ Mejor experiencia de usuario con contenido siempre disponible
- ✅ Reducción de costos de API y Firebase
- ✅ Mejor SEO al servir contenido estático a bots

## Testing

Para verificar que funciona:

1. **Local:**
   ```bash
   npm run build
   npm run start
   ```
   Visita http://localhost:3000 y verifica que carga sin errores

2. **Producción:**
   - Deploy a Vercel
   - Monitorear logs para ver mensajes de caché
   - Verificar que no hay errores 403 en las próximas 24-48 horas

3. **Verificar ISR:**
   - La primera carga puede ser lenta (genera la página)
   - Las siguientes cargas deben ser instantáneas (sirve caché)
   - Después de 1 hora, se regenera automáticamente

## Notas Técnicas

- ISR funciona solo en producción (Vercel), en desarrollo siempre regenera
- La caché de Firebase sigue siendo la fuente de verdad
- Los logs con emojis ayudan a identificar el flujo en Vercel logs
- El User-Agent personalizado puede ayudar si CheapShark contacta sobre el uso

## Contacto

Si hay problemas o preguntas sobre esta implementación, revisar:
- Logs de Vercel para errores
- Firebase Console para verificar caché
- CheapShark API status