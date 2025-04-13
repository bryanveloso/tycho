import type { ShapeCollection } from '@/types/index'

class CollectionRegistry {
  private collections: Map<string, ShapeCollection> = new Map()
  private initialized: boolean = false

  register(collections: ShapeCollection[]): void {
    if (this.initialized) return

    for (const collection of collections) {
      if (!this.collections.has(collection.id)) {
        this.collections.set(collection.id, collection)
      }
    }

    this.initialized = true
  }

  get(id: string): ShapeCollection | undefined {
    const collection = this.collections.get(id)

    if (!collection) {
      console.warn(`Collection "${id}" not found, returning empty collection`)
      return {
        id: id,
        name: id,
        description: 'Empty collection',
        shapes: []
      }
    }
    return collection
  }

  getAll(): ShapeCollection[] {
    return Array.from(this.collections.values())
  }
}

export const collectionRegistry = new CollectionRegistry()
