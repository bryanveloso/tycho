import { useEffect, useState } from 'react'

import { collectionRegistry } from '@/lib/collections/registry'
import { patternGeneratorRegistry } from '@/lib/patterns/registry'
import { shapeRegistry } from '@/lib/shapes/registry'
import type { PatternConfig, PatternElement } from '@/types/index'
import { simpleHash } from '@/utils/hash'

export function usePatternGenerator(config: PatternConfig) {
  const [svg, setSvg] = useState<string>('')
  const [elements, setElements] = useState<PatternElement[]>([])

  useEffect(() => {
    const newElements = generatePatternElements(config)
    setElements(newElements)

    const svgContent = generateSVG(newElements, config)
    setSvg(svgContent)
  }, [config])

  const generatePatternElements = (config: PatternConfig): PatternElement[] => {
    const { seed, rows, columns, patternStyle, shapeCollection } = config

    const elements: PatternElement[] = []
    const hashValue = simpleHash(seed)

    // Get available shapes from the collection
    const collection = collectionRegistry.get(shapeCollection)

    if (!collection) {
      console.error(`Collection "${shapeCollection}" not found in registry`)
      return elements
    }

    if (collection.shapes.length === 0) {
      console.error(`Collection "${shapeCollection}" exists but contains no shapes`)
      return elements
    }

    // Verify that shapes actually exist in the registry
    const availableShapes = collection.shapes.filter((shapeId) => shapeRegistry.get(shapeId) !== undefined)
    if (availableShapes.length === 0) {
      console.error(`Collection "${shapeCollection}" contains shape IDs but none are registered`)
      return elements
    }

    // Get the pattern generator
    const patternGenerator = patternGeneratorRegistry.get(patternStyle)
    if (!patternGenerator) {
      console.error(`Pattern style "${patternStyle}" not found in registry`)
      return elements
    }

    // Generate pattern elements
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        // Use the pattern generator to determine if we should show an element at this position
        const { showElement, intensity } = patternGenerator(x, y, config)

        if (showElement && availableShapes.length > 0) {
          // Select a shape from the available shapes based on the intensity value
          const shapeIndex = Math.floor(intensity * availableShapes.length)
          const shapeName = availableShapes[shapeIndex]

          // Add this element to our pattern
          elements.push({
            x,
            y,
            intensity,
            shape: shapeName
          })
        }
      }
    }

    return elements
  }

  const generateSVG = (elements: PatternElement[], config: PatternConfig): string => {
    const { shapeSize, backgroundColor, columns, rows, mainColor } = config

    // Calculate SVG dimensions
    const svgWidth = columns * shapeSize * 1.5
    const svgHeight = rows * shapeSize * 1.5

    // Start SVG content
    let svgContent = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />`

    // Add each element to the SVG
    elements.forEach((element) => {
      const x = element.x * shapeSize * 1.5 + shapeSize
      const y = element.y * shapeSize * 1.5 + shapeSize
      const size = shapeSize

      // Adjust color opacity
      let color = mainColor

      // Get the shape renderer from the registry
      const shape = shapeRegistry.get(element.shape)
      if (shape) {
        // Render the shape using its render function
        svgContent += shape.render(x, y, size, color)
      } else {
        console.warn(`Shape "${element.shape}" not found in registry`)
      }
    })

    // Close SVG tag
    svgContent += '</svg>'

    return svgContent
  }

  const exportSVG = () => {}

  return {
    svg,
    elements,
    exportSVG
  }
}
