// lib/services/currency.service.ts
// Live USD/ETB exchange rate with 1-hour localStorage cache

const CACHE_KEY = 'lotus_etb_rate'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in ms
const FALLBACK_RATE = 155 // Latest NBE approximate rate
const API_URL = 'https://open.er-api.com/v6/latest/USD'

interface CachedRate {
  rate: number
  timestamp: number
}

function getCachedRate(): number | null {
  if (typeof window === 'undefined') return null
  try {
    const cached = localStorage.getItem(CACHE_KEY)
    if (!cached) return null
    const parsed: CachedRate = JSON.parse(cached)
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.rate
    }
    return null // expired
  } catch {
    return null
  }
}

function setCachedRate(rate: number): void {
  if (typeof window === 'undefined') return
  try {
    const data: CachedRate = { rate, timestamp: Date.now() }
    localStorage.setItem(CACHE_KEY, JSON.stringify(data))
  } catch {
    // localStorage might be full or unavailable
  }
}

export async function getExchangeRate(): Promise<number> {
  // Check cache first
  const cached = getCachedRate()
  if (cached) return cached

  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    const rate = data?.rates?.ETB
    if (typeof rate === 'number' && rate > 0) {
      setCachedRate(rate)
      return rate
    }
    throw new Error('Invalid rate data')
  } catch (error) {
    console.warn('Currency API failed, using fallback rate:', error)
    return FALLBACK_RATE
  }
}

export async function formatETB(usdPrice: number): Promise<string> {
  const rate = await getExchangeRate()
  const etbPrice = usdPrice * rate
  return `ETB ${etbPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function formatPriceSync(price: number, currency: 'USD' | 'ETB', rate: number): string {
  const convertedPrice = currency === 'ETB' ? price * rate : price
  return currency === 'ETB'
    ? `ETB ${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : `$${convertedPrice.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}
