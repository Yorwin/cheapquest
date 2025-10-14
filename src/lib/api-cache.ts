// Client-safe API functions (no Firebase, no server-only)
const API_KEY = process.env.RAWG_API_KEY

// Regular RAWG API fetch (no caching for client components)
export async function rawgFetch(endpoint: string, params: Record<string, any> = {}): Promise<any> {
  const url = new URL(`https://api.rawg.io/api${endpoint}`)
  url.searchParams.set('key', API_KEY!)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }
  })

  if (!response.ok) {
    throw new Error(`RAWG API Error: ${response.status} - ${response.statusText}`)
  }

  return response.json()
}

// Regular CheapShark API fetch (no caching for client components)
export async function cheapSharkFetch(endpoint: string, params: Record<string, any> = {}): Promise<any> {
  const url = new URL(`https://www.cheapshark.com/api/1.0${endpoint}`)

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    next: { revalidate: 1800 }
  })

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Rate limited by CheapShark API')
    }
    throw new Error(`CheapShark API Error: ${response.status} - ${response.statusText}`)
  }

  return response.json()
}