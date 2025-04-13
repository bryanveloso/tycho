import type { ShapeDefinition } from '@/types/index'
import { shapeRegistry } from './registry'

const square: ShapeDefinition = {
  id: 'square',
  name: 'square',
  category: 'basic',
  render(x, y, size, color) {
    return `<rect x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}" fill="${color}" />`
  }
}

const circle: ShapeDefinition = {
  id: 'circle',
  name: 'circle',
  category: 'basic',
  render(x, y, size, color) {
    return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}" />`
  }
}

const triangle: ShapeDefinition = {
  id: 'triangle',
  name: 'triangle',
  category: 'basic',
  render(x, y, size, color) {
    const halfSize = size / 2
    return `<polygon points="${x},${y - halfSize} ${x - halfSize},${y + halfSize} ${x + halfSize},${y + halfSize}" fill="${color}" />`
  }
}

const diamond: ShapeDefinition = {
  id: 'diamond',
  name: 'diamond',
  category: 'basic',
  render(x, y, size, color) {
    const halfSize = size / 2
    return `<polygon points="${x},${y - halfSize} ${x - halfSize},${y} ${x},${y + halfSize} ${x + halfSize},${y}" fill="${color}" />`
  }
}

export function registerBasicShapes() {
  shapeRegistry.register([square, circle, triangle, diamond])
}
