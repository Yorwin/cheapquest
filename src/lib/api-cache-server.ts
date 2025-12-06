import 'server-only'

import {
  checkGameCache,
  checkOfferCache,
  saveGameToCache,
  saveOfferToCache,
  updateGameWithCheapSharkData,
  getGameByCustomId,
  checkGenreGamesCache,
  saveGenreGamesToCache,
  checkGameTrailerCache,
  saveGameTrailerToCache,
  checkDealSearchCache,
  saveDealSearchToCache,
  generateCustomGameId
} from './firebase-cache'

const API_KEY = process.env.RAWG_API_KEY

// Cached RAWG API fetch - SERVER ONLY
export async function cachedRawgFetch(endpoint: string, params: Record<string, any> = {}): Promise<any> {
  // Generate cache key based on endpoint and params
  const cacheKey = `${endpoint}_${JSON.stringify(params)}`

  // For game data, use RAWG ID as cache key
  if (endpoint.includes('/games/') && params.id) {
    const cachedGame = await checkGameCache(params.id)
    if (cachedGame) {
      return cachedGame.rawgData
    }
  }

  // For game search, try to find by custom ID first
  if (endpoint === '/games' && params.search) {
    const customGameId = generateCustomGameId(params.search)
    const cachedGame = await getGameByCustomId(customGameId)
    if (cachedGame) {
      return { results: [cachedGame.rawgData] }
    }
  }

  // Build URL with all parameters
  let url = `https://api.rawg.io/api${endpoint}?key=${API_KEY}`

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url += `&${key}=${value}`
    }
  })


  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 } // Fallback revalidation
  })

  if (!response.ok) {
    throw new Error(`RAWG API Error: ${response.status} - ${response.statusText}`)
  }

  const data = await response.json()

  // Cache game data if it's a single game
  if (endpoint.includes('/games/') && params.id && data.id) {
    await saveGameToCache(params.id, data)
  }

  // Cache search results
  if (endpoint === '/games' && params.search && data.results && data.results.length > 0) {
    const game = data.results[0]
    if (game.id) {
      await saveGameToCache(game.id.toString(), game)
    }
  }

  return data
}

// Specialized function for genre-based game lists with caching
export async function cachedRawgGenreFetch(genreId: number, params: Record<string, any> = {}): Promise<any> {
  // Check if we have cached genre games
  const cachedGenreGames = await checkGenreGamesCache(genreId)
  if (cachedGenreGames) {
    return { results: cachedGenreGames }
  }

  // Build URL with all parameters
  let url = `https://api.rawg.io/api/games?key=${API_KEY}&genres=${genreId}`

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url += `&${key}=${value}`
    }
  })


  const response = await fetch(url, {
    next: { revalidate: 3600 }
  })

  if (!response.ok) {
    throw new Error(`RAWG API Error: ${response.status} - ${response.statusText}`)
  }

  const data = await response.json()

  // Cache the genre games (but limit to reasonable number)
  if (data.results && data.results.length > 0) {
    const gamesToCache = data.results.slice(0, 50) // Cache up to 50 games per genre
    await saveGenreGamesToCache(genreId, gamesToCache)
  }

  return data
}

// Cached CheapShark API fetch - SERVER ONLY
export async function cachedCheapSharkFetch(endpoint: string, params: Record<string, any> = {}): Promise<any> {
  // For deals search by title, check cache first
  if (endpoint === '/deals' && params.title) {
    const cachedDeals = await checkDealSearchCache(params.title)
    if (cachedDeals) {
      return cachedDeals
    }
  }

  // For specific deal info
  if (endpoint === '/deals' && params.id) {
    const cachedOffer = await checkOfferCache(params.id)
    if (cachedOffer) {
      return cachedOffer.dealData
    }
  }

  // Fetch from API
  const url = new URL(`https://www.cheapshark.com/api/1.0${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })

  try {
    const response = await fetch(url, {
      next: { revalidate: 1800 }, // Fallback revalidation
      headers: {
        'User-Agent': 'CheapQuest/1.0 (https://cheapquest.app)', // Identify as legitimate app
      }
    })

    if (!response.ok) {
      // Handle rate limiting and forbidden errors with stale cache fallback
      if (response.status === 403 || response.status === 429) {
        console.warn(`⚠️ CheapShark blocked request (${response.status}), attempting stale cache fallback`)

        // Try to use stale cache as fallback
        if (endpoint === '/deals' && params.title) {
          const staleCache = await checkDealSearchCache(params.title, true) // Ignore freshness
          if (staleCache) {
            console.log(`📦 Using stale cache for: ${params.title}`)
            return staleCache
          }
        }

        throw new Error(`CheapShark API blocked: ${response.status} - No cache available`)
      }

      throw new Error(`CheapShark API Error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()

    // Cache individual deals
    if (endpoint === '/deals' && params.id && data.gameID) {
      await saveOfferToCache(params.id, data)
    }

    // Cache deal arrays (for search results)
    if (endpoint === '/deals' && Array.isArray(data)) {
      // Cache individual deals
      for (const deal of data) {
        if (deal.dealID) {
          await saveOfferToCache(deal.dealID, deal)
        }
      }

      // Cache the search results if it was a title search
      if (params.title) {
        await saveDealSearchToCache(params.title, data)
      }
    }

    return data
  } catch (error) {
    // Final fallback: try stale cache on any error
    console.error('❌ CheapShark fetch failed:', error)

    if (endpoint === '/deals' && params.title) {
      const staleCache = await checkDealSearchCache(params.title, true)
      if (staleCache) {
        console.log(`📦 Emergency fallback: using stale cache for ${params.title}`)
        return staleCache
      }
    }

    throw error
  }
}

// Specialized function for game info with CheapShark data - SERVER ONLY
export async function getCachedGameInfo(gameName: string): Promise<any> {
  // First try to get from RAWG cache
  const rawgData = await cachedRawgFetch('/games', { search: gameName })

  if (rawgData.results && rawgData.results.length > 0) {
    const game = rawgData.results[0]

    // Try to get CheapShark offers
    try {
      const offers = await cachedCheapSharkFetch('/deals', {
        title: gameName,
        exact: 1,
        onSale: 1
      })

      // Update game with CheapShark data if we have offers
      if (offers && offers.length > 0) {
        await updateGameWithCheapSharkData(game.id.toString(), offers)
      }

      return {
        ...game,
        cachedOffers: offers || []
      }
    } catch (error) {
      console.warn('Failed to fetch CheapShark data:', error)
      return game
    }
  }

  return null
}

// Specialized function for game trailer caching with null handling
export async function getCachedGameTrailer(gameId: string): Promise<any> {
  // Check if we have cached trailer data
  const cachedTrailer = await checkGameTrailerCache(gameId)
  if (cachedTrailer !== null) {
    // Return cached trailer (could be actual trailer data or null)
    return cachedTrailer
  }

  // No cached data or data is stale, fetch from API
  try {
    const data = await cachedRawgFetch(`/games/${gameId}/movies`)
    const trailer = data.results?.[0] || null

    // Cache the result (including null for games without trailers)
    await saveGameTrailerToCache(gameId, trailer)

    return trailer
  } catch (error) {
    console.error('Error fetching game trailer:', error)
    // Even on error, cache null to avoid repeated failed requests
    await saveGameTrailerToCache(gameId, null)
    return null
  }
}