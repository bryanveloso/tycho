export interface ShapeDefinition {
  id: string
  name: string
  category: ShapeCategory
  render: (x: number, y: number, size: number, color: string) => string
  tags?: string[]
}

export type ShapeCategory = 'basic' | 'marathon' | 'custom'

export interface ShapeCollection {
  id: string
  name: string
  description: string
  shapes: string[]
}

export interface PatternConfig {
  seed: string
  shapeSize: number
  mainColor: string
  backgroundColor: string
  rows: number
  columns: number
  density: number
  noiseScale: number
  patternStyle: 'geo' | 'random' | 'grid'
  shapeCollection: string
}

export interface PatternElement {
  x: number
  y: number
  intensity: number
  shape: string
}
