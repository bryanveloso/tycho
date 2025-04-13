import type { ShapeCollection } from '@/types/index'

import { collectionRegistry } from './registry'

const basic: ShapeCollection = {
  id: 'basic',
  name: 'Basic',
  description: 'Basic shapes.',
  shapes: ['square', 'circle', 'triangle', 'diamond']
}

export function registerDefaultCollections() {
  collectionRegistry.register([basic])
}
