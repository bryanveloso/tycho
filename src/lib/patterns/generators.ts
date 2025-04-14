import type { PatternConfig, PatternElement } from '@/types/index'
import { simpleHash } from '@/utils/hash'

// Random number generator seeded with a hash value
export function seededRng(min: number, max: number, hashValue: number, seed: number = 0) {
  const x = Math.sin((hashValue + seed) * 9999) * 10000
  return min + (x - Math.floor(x)) * (max - min)
}

// Simple perlin-like noise function
export function noise(x: number, y: number, seedValue: number, noiseScale: number) {
  const val = Math.sin(x * noiseScale * 10 + seedValue) * Math.sin(y * noiseScale * 10 + seedValue) * 0.5 + 0.5
  return val
}

// Generate geographic pattern elements
export function generateGeoPattern(
  x: number,
  y: number,
  seed: string,
  density: number,
  noiseScale: number
): { showElement: boolean; intensity: number } {
  const seedVal = simpleHash(seed)
  // Enhanced geographic pattern
  // Use multiple noise octaves for more natural landmass-like patterns
  const noiseVal1 = noise(x, y, seedVal, noiseScale)
  const noiseVal2 = noise(x * 2, y * 2, seedVal + 100, noiseScale * 2) * 0.5
  const noiseVal = (noiseVal1 + noiseVal2) / 1.5

  // Adjustable threshold based on density creates more coherent "land masses"
  const threshold = 1 - density
  return {
    showElement: noiseVal > threshold,
    intensity: noiseVal
  }
}

// Generate random pattern elements
export function generateRandomPattern(
  x: number,
  y: number,
  hashValue: number,
  density: number
): { showElement: boolean; intensity: number } {
  const noiseVal = seededRng(0, 1, hashValue, (x + 1) * (y + 1))
  return {
    showElement: noiseVal < density,
    intensity: noiseVal
  }
}

// Generate grid pattern elements
export function generateGridPattern(
  x: number,
  y: number,
  hashValue: number,
  density: number
): { showElement: boolean; intensity: number } {
  const noiseVal = seededRng(0.3, 1, hashValue, x + y)
  const showElement = (x % 3 === 0 || y % 3 === 0) && seededRng(0, 1, hashValue, x * y) < density
  return {
    showElement,
    intensity: noiseVal
  }
}
