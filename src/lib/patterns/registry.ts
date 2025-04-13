import type { PatternConfig } from '@/types/index'
import { generateGeoPattern, generateRandomPattern, generateGridPattern } from './generators'
import { simpleHash } from '@/utils/hash'

export type PatternGeneratorFunction = (
  x: number,
  y: number,
  config: PatternConfig
) => { showElement: boolean; intensity: number }

// Pattern generator registry
class PatternGeneratorRegistry {
  private generators: Record<string, PatternGeneratorFunction> = {}

  constructor() {
    this.register('geo', (x, y, config) => {
      return generateGeoPattern(x, y, config.seed, config.density, config.noiseScale)
    })

    this.register('random', (x, y, config) => {
      const hashValue = simpleHash(config.seed)
      return generateRandomPattern(x, y, hashValue, config.density)
    })

    this.register('grid', (x, y, config) => {
      const hashValue = simpleHash(config.seed)
      return generateGridPattern(x, y, hashValue, config.density)
    })
  }

  register(patternStyle: string, generator: PatternGeneratorFunction): void {
    this.generators[patternStyle] = generator
  }

  get(patternStyle: string): PatternGeneratorFunction | undefined {
    return this.generators[patternStyle]
  }

  has(patternStyle: string): boolean {
    return patternStyle in this.generators
  }
}

export const patternGeneratorRegistry = new PatternGeneratorRegistry()
