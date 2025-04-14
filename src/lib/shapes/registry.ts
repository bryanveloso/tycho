import type { ShapeDefinition } from '@/types/index'

class ShapeRegistry {
  private shapes: Map<string, ShapeDefinition> = new Map()

  register(shapes: ShapeDefinition[]) {
    for (const shape of shapes) {
      if (!this.shapes.has(shape.id)) {
        console.log(`Registering shape: ${shape.id}`)
        this.shapes.set(shape.id, shape)
      }
    }
  }

  get(id: string): ShapeDefinition | undefined {
    return this.shapes.get(id)
  }

  getAll(): ShapeDefinition[] {
    return Array.from(this.shapes.values())
  }

  getByCategory(category: string): ShapeDefinition[] {
    return this.getAll().filter((shape) => shape.category === category)
  }
}

// Singleton instance of ShapeRegistry
export const shapeRegistry = new ShapeRegistry()
