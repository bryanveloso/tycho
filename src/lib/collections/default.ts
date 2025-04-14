import type { ShapeCollection } from '@/types/index'

import { collectionRegistry } from './registry'

const basic: ShapeCollection = {
  id: 'basic',
  name: 'Basic',
  description: 'Basic shapes.',
  shapes: ['square', 'circle', 'triangle', 'diamond']
}

const marathon: ShapeCollection = {
  id: 'marathon',
  name: 'Marathon',
  description: "Shapes inspired by Marathon's assets.",
  shapes: ['singleDot', 'quadDots']
}

export function registerDefaultCollections() {
  collectionRegistry.register([basic, marathon])
}
