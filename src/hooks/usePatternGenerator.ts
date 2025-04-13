import { useEffect, useState } from 'react'

import { collectionRegistry } from '@/lib/collections/registry'
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
    const { seed, rows, columns, patternStyle, density, shapeCollection } = config

    const elements: PatternElement[] = []
    const hashValue = simpleHash(seed)

    // Random number generator seeded with the hash value
    const rng = (min: number, max: number, seed: number = 0) => {
      const x = Math.sin((hashValue + seed) * 9999) * 10000
      return min + (x - Math.floor(x)) * (max - min)
    }

    // Perlin noise function
    const noise = (x: number, y: number, seed: string) => {
      const seedVal = simpleHash(seed)
      const noiseScale = config.noiseScale
      const val = Math.sin(x * noiseScale * 10 + seedVal) * Math.sin(y * noiseScale * 10 + seedVal) * 0.5 + 0.5
      return val
    }

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
    const availableShapes = collection.shapes.filter(shapeId => shapeRegistry.get(shapeId) !== undefined)
    if (availableShapes.length === 0) {
      console.error(`Collection "${shapeCollection}" contains shape IDs but none are registered`)
      return elements
    }

    // Generate pattern elements
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        let showElement = false
        let noiseVal = 0

        if (patternStyle === 'geo') {
          // Geographic pattern - use noise to create continents
          noiseVal = noise(x, y, seed)
          showElement = noiseVal > 1 - density
        } else if (patternStyle === 'random') {
          // Pure random pattern
          noiseVal = rng(0, 1, x * y)
          showElement = noiseVal < density
        } else if (patternStyle === 'grid') {
          // Grid pattern with some randomness
          noiseVal = rng(0.3, 1, x + y)
          showElement = (x % 3 === 0 || y % 3 === 0) && rng(0, 1, x * y) < density
        }

        if (showElement && availableShapes.length > 0) {
          // Select a shape from the available shapes based on the noise value
          const shapeIndex = Math.floor(noiseVal * availableShapes.length)
          const shapeName = availableShapes[shapeIndex]

          // Add this element to our pattern
          elements.push({
            x,
            y,
            intensity: noiseVal,
            shape: shapeName
          })
        }
      }
    }

    return elements
  }

  const generateSVG = (elements: PatternElement[], config: PatternConfig): string => {
    const { shapeSize, backgroundColor, columns, rows, mainColor, useVariableSize, useVariableOpacity } = config

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

      // Calculate size and opacity based on intensity
      const sizeModifier = useVariableSize ? 0.6 + element.intensity * 0.8 : 1
      const opacityModifier = useVariableOpacity ? 0.6 + element.intensity * 0.4 : 1

      const size = shapeSize * sizeModifier

      // Adjust color opacity
      let color = mainColor
      if (useVariableOpacity) {
        // Convert hex to rgba for opacity
        const r = parseInt(mainColor.slice(1, 3), 16)
        const g = parseInt(mainColor.slice(3, 5), 16)
        const b = parseInt(mainColor.slice(5, 7), 16)
        color = `rgba(${r}, ${g}, ${b}, ${opacityModifier})`
      }

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
