/**
 * A simple string hashing function that generates a numeric hash value.
 * This is used to seed the random number generator for consistent pattern generation.
 *
 * @param str - The string to hash.
 * @returns A numeric hash value.
 */
export const simpleHash = (str: string): number => {
  let hash = 0

  if (str.length === 0) return hash

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char // hash * 31 + char
    hash = hash & hash
  }

  return hash
}

/**
 * Creates a seeded random number generator function.
 *
 * @param {number} seed - The seed value for the random number generator.
 * @returns {function} A function that generates a random number between min and max.
 */
export const createSeededRandom = (seed: number) => {
  return (min: number, max: number) => {
    const x = Math.sin(seed++) * 10000
    return min + (x - Math.floor(x)) * (max - min)
  }
}
