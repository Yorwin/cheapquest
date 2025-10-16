import 'server-only'

import { db } from './firebase-admin'
import { GameDealWithoutScore } from '@/types/types'

// Interfaces for cached data
export interface CachedGame {
  rawgId: string
  rawgData: any
  cheapSharkData?: any
  franchiseData?: any[]
  customGameId: string
  lastUpdated: Date
  createdAt: Date
}

export interface CachedOffer {
  dealId: string
  dealData: GameDealWithoutScore
  gameId?: string
  lastUpdated: Date
  createdAt: Date
}

// Helper function to check if data is fresh
export function isDataFresh(lastUpdated: Date, maxAgeDays: number): boolean {
  const now = new Date()
  const ageInMs = now.getTime() - lastUpdated.getTime()
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000
  return ageInMs < maxAgeMs
}

// Check if game exists in cache and is fresh
export async function checkGameCache(rawgId: string): Promise<CachedGame | null> {
  try {
    const docRef = db.collection('games').doc(rawgId)
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      const data = docSnap.data()
      const cachedGame: CachedGame = {
        rawgId,
        rawgData: data?.rawgData,
        cheapSharkData: data?.cheapSharkData,
        customGameId: data?.customGameId,
        lastUpdated: data?.lastUpdated.toDate(),
        createdAt: data?.createdAt.toDate()
      }

      // Check if game data is fresh (3 months)
      if (isDataFresh(cachedGame.lastUpdated, 90)) {
        return cachedGame
      }
    }

    return null
  } catch (error) {
    console.error('Error checking game cache:', error)
    return null
  }
}

// Check if offer exists in cache and is fresh
export async function checkOfferCache(dealId: string): Promise<CachedOffer | null> {
  try {
    const docRef = db.collection('offers').doc(dealId)
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      const data = docSnap.data()
      const cachedOffer: CachedOffer = {
        dealId,
        dealData: data?.dealData,
        gameId: data?.gameId,
        lastUpdated: data?.lastUpdated.toDate(),
        createdAt: data?.createdAt.toDate()
      }

      // Check if offer data is fresh (3 days)
      if (isDataFresh(cachedOffer.lastUpdated, 3)) {
        return cachedOffer
      }
    }

    return null
  } catch (error) {
    console.error('Error checking offer cache:', error)
    return null
  }
}

// Save game to cache
export async function saveGameToCache(rawgId: string, rawgData: any, cheapSharkData?: any): Promise<void> {
  try {
    const now = new Date()
    const customGameId = generateCustomGameId(rawgData.name || rawgId)

    // Filter out undefined values for Firestore
    const cleanData: any = {
      rawgId,
      rawgData,
      customGameId,
      lastUpdated: now,
      createdAt: now
    }

    if (cheapSharkData !== undefined) {
      cleanData.cheapSharkData = cheapSharkData
    }

    await db.collection('games').doc(rawgId).set(cleanData, { merge: true })

  } catch (error) {
    console.error('Error saving game to cache:', error)
  }
}

// Save offer to cache
export async function saveOfferToCache(dealId: string, dealData: GameDealWithoutScore, gameId?: string): Promise<void> {
  try {
    const now = new Date()

    const offerData: CachedOffer = {
      dealId,
      dealData,
      gameId,
      lastUpdated: now,
      createdAt: now
    }

    // Filter out undefined values for Firestore
    const cleanData: any = {
      dealId,
      dealData,
      lastUpdated: now,
      createdAt: now
    }

    if (gameId !== undefined) {
      cleanData.gameId = gameId
    }

    await db.collection('offers').doc(dealId).set(cleanData, { merge: true })

  } catch (error) {
    console.error('Error saving offer to cache:', error)
  }
}

// Generate custom game ID
export function generateCustomGameId(gameName: string): string {
  return gameName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Get game by custom ID
export async function getGameByCustomId(customGameId: string): Promise<CachedGame | null> {
  try {
    const querySnapshot = await db.collection('games')
      .where('customGameId', '==', customGameId)
      .limit(1)
      .get()

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      const data = doc.data()
      return {
        rawgId: doc.id,
        rawgData: data.rawgData,
        cheapSharkData: data.cheapSharkData,
        customGameId: data.customGameId,
        lastUpdated: data.lastUpdated.toDate(),
        createdAt: data.createdAt.toDate()
      }
    }

    return null
  } catch (error) {
    console.error('Error getting game by custom ID:', error)
    return null
  }
}

// Update game with CheapShark data
export async function updateGameWithCheapSharkData(rawgId: string, cheapSharkData: any): Promise<void> {
  try {
    const now = new Date()
    await db.collection('games').doc(rawgId).update({
      cheapSharkData,
      lastUpdated: now
    })
  } catch (error) {
    console.error('Error updating game with CheapShark data:', error)
  }
}

// Update game with franchise data
export async function updateGameWithFranchiseData(rawgId: string, franchiseData: any[]): Promise<void> {
  try {
    const now = new Date()
    await db.collection('games').doc(rawgId).update({
      franchiseData,
      lastUpdated: now
    })
  } catch (error) {
    console.error('Error updating game with franchise data:', error)
  }
}

// Check if game has cached trailer data
export async function checkGameTrailerCache(rawgId: string): Promise<any | null> {
  try {
    const docRef = db.collection('game_trailers').doc(rawgId)
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      const data = docSnap.data()
      if (data) {
        const lastUpdated = data.lastUpdated.toDate()

        // For games with trailers, check freshness (3 months)
        // For games without trailers, check freshness (1 month)
        const maxAgeDays = data.trailer === null ? 30 : 90
        const isTrailerDataFresh = isDataFresh(lastUpdated, maxAgeDays)

        if (isTrailerDataFresh) {
          return data.trailer
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error checking game trailer cache:', error)
    return null
  }
}

// Save game trailer data (including null for games without trailers)
export async function saveGameTrailerToCache(rawgId: string, trailer: any): Promise<void> {
  try {
    const now = new Date()
    await db.collection('game_trailers').doc(rawgId).set({
      trailer,
      lastUpdated: now,
      createdAt: now
    })
  } catch (error) {
    console.error('Error saving game trailer to cache:', error)
  }
}

// Check if we have cached deal search results for a game title
export async function checkDealSearchCache(gameTitle: string): Promise<GameDealWithoutScore[] | null> {
  try {
    const docRef = db.collection('deal_searches').doc(gameTitle.toLowerCase().trim())
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      const data = docSnap.data()
      if (data) {
        const lastUpdated = data.lastUpdated.toDate()

        // Deal search results are valid for 1 day
        if (isDataFresh(lastUpdated, 1)) {
          return data.deals
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error checking deal search cache:', error)
    return null
  }
}

// Save deal search results for a game title
export async function saveDealSearchToCache(gameTitle: string, deals: GameDealWithoutScore[]): Promise<void> {
  try {
    const now = new Date()
    await db.collection('deal_searches').doc(gameTitle.toLowerCase().trim()).set({
      deals,
      lastUpdated: now,
      createdAt: now
    })
  } catch (error) {
    console.error('Error saving deal search to cache:', error)
  }
}

// Cache for genre-based game lists
export async function checkGenreGamesCache(genreId: number): Promise<any | null> {
  try {
    const docRef = db.collection('genre_games').doc(genreId.toString())
    const docSnap = await docRef.get()

    if (docSnap.exists) {
      const data = docSnap.data()
      if (data) {
        const lastUpdated = data.lastUpdated.toDate()

        // Genre games cache for 7 days (more dynamic than individual games)
        if (isDataFresh(lastUpdated, 7)) {
          return data.games
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error checking genre games cache:', error)
    return null
  }
}

// Save genre games to cache
export async function saveGenreGamesToCache(genreId: number, games: any[]): Promise<void> {
  try {
    const now = new Date()
    await db.collection('genre_games').doc(genreId.toString()).set({
      games,
      lastUpdated: now,
      createdAt: now
    })
  } catch (error) {
    console.error('Error saving genre games to cache:', error)
  }
}