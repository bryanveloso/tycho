/**
 * SVG to Tycho Shape Converter
 *
 * This script converts SVG files exported from design tools into shape definitions
 * that can be used with the Tycho Geographic Dot Matrix Generator.
 *
 * Usage:
 * 1. Save this file as 'svg-converter.ts' in your project
 * 2. Run: bun svg-converter.ts path/to/your-shape.svg
 *
 * Requirements:
 * - Node.js/Bun
 * - TypeScript
 * - fs and path modules (built into Node/Bun)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Define interfaces
interface ShapeDefinition {
  id: string
  name: string
  category: string
  render: (x: number, y: number, size: number, color: string) => string
}

interface ConversionOptions {
  id?: string
  name?: string
  category?: string
  originalWidth?: number
  originalHeight?: number
  outputPath?: string
}

/**
 * Extract the relevant SVG content from a full SVG file
 */
function extractSvgContent(svgString: string): {
  content: string
  width: number
  height: number
} {
  // Extract width and height
  const widthMatch = svgString.match(/width="(\d+)(?:px)?"/)
  const heightMatch = svgString.match(/height="(\d+)(?:px)?"/)

  const width = widthMatch ? parseInt(widthMatch[1], 10) : 100
  const height = heightMatch ? parseInt(heightMatch[1], 10) : 100

  // Find the content inside the SVG tag
  const contentMatch = svgString.match(/<svg[^>]*>([\s\S]*?)<\/svg>/i)

  if (!contentMatch || !contentMatch[1]) {
    throw new Error('Could not extract valid SVG content')
  }

  // Get the content, removing any wrapper groups if possible
  let content = contentMatch[1].trim()

  // If the content is wrapped in a single group, we can often extract from that
  const singleGroupMatch = content.match(/^\s*<g[^>]*>([\s\S]*?)<\/g>\s*$/)
  if (singleGroupMatch && singleGroupMatch[1]) {
    content = singleGroupMatch[1].trim()
  }

  return { content, width, height }
}

/**
 * Process an SVG element to make it work with Tycho's shape system
 *
 * This function transforms SVG elements to be centered and scaled properly
 * based on the parameters that will be passed to the render function.
 */
function processSvgElement(element: string, originalWidth: number, originalHeight: number): string {
  // The center of the original SVG
  const centerX = originalWidth / 2
  const centerY = originalHeight / 2

  // Replace absolute coordinates with relative ones based on parameters
  // This is a simplified version and may need to be adjusted for complex SVGs

  // Handle common SVG elements
  // rect: x, y, width, height
  element = element.replace(
    /<rect\s+([^>]*?)x="([^"]+)"([^>]*?)y="([^"]+)"([^>]*?)width="([^"]+)"([^>]*?)height="([^"]+)"([^>]*?)>/gi,
    (match, pre1, x, pre2, y, pre3, width, pre4, height, post) => {
      const xVal = parseFloat(x)
      const yVal = parseFloat(y)
      const widthVal = parseFloat(width)
      const heightVal = parseFloat(height)

      // Transform to be relative to center and scaled by size
      const relX = `\${x + (${(xVal - centerX).toFixed(2)}) * scale}`
      const relY = `\${y + (${(yVal - centerY).toFixed(2)}) * scale}`
      const relWidth = `\${${widthVal.toFixed(2)} * scale}`
      const relHeight = `\${${heightVal.toFixed(2)} * scale}`

      return `<rect ${pre1}x="${relX}"${pre2}y="${relY}"${pre3}width="${relWidth}"${pre4}height="${relHeight}"${post}>`
    }
  )

  // circle: cx, cy, r
  element = element.replace(
    /<circle\s+([^>]*?)cx="([^"]+)"([^>]*?)cy="([^"]+)"([^>]*?)r="([^"]+)"([^>]*?)>/gi,
    (match, pre1, cx, pre2, cy, pre3, r, post) => {
      const cxVal = parseFloat(cx)
      const cyVal = parseFloat(cy)
      const rVal = parseFloat(r)

      const relCx = `\${x + (${(cxVal - centerX).toFixed(2)}) * scale}`
      const relCy = `\${y + (${(cyVal - centerY).toFixed(2)}) * scale}`
      const relR = `\${${rVal.toFixed(2)} * scale}`

      return `<circle ${pre1}cx="${relCx}"${pre2}cy="${relCy}"${pre3}r="${relR}"${post}>`
    }
  )

  // ellipse: cx, cy, rx, ry
  element = element.replace(
    /<ellipse\s+([^>]*?)cx="([^"]+)"([^>]*?)cy="([^"]+)"([^>]*?)rx="([^"]+)"([^>]*?)ry="([^"]+)"([^>]*?)>/gi,
    (match, pre1, cx, pre2, cy, pre3, rx, pre4, ry, post) => {
      const cxVal = parseFloat(cx)
      const cyVal = parseFloat(cy)
      const rxVal = parseFloat(rx)
      const ryVal = parseFloat(ry)

      const relCx = `\${x + (${(cxVal - centerX).toFixed(2)}) * scale}`
      const relCy = `\${y + (${(cyVal - centerY).toFixed(2)}) * scale}`
      const relRx = `\${${rxVal.toFixed(2)} * scale}`
      const relRy = `\${${ryVal.toFixed(2)} * scale}`

      return `<ellipse ${pre1}cx="${relCx}"${pre2}cy="${relCy}"${pre3}rx="${relRx}"${pre4}ry="${relRy}"${post}>`
    }
  )

  // Handle polygon and polyline points
  element = element.replace(/(<(?:polygon|polyline)[^>]*?points=")([^"]+)(")/gi, (match, prefix, pointsStr, suffix) => {
    // Split points into pairs of coordinates
    const points = pointsStr.trim().split(/\s+|,/).filter(Boolean)
    const pairs = []

    for (let i = 0; i < points.length; i += 2) {
      if (i + 1 < points.length) {
        const x = parseFloat(points[i])
        const y = parseFloat(points[i + 1])

        // Transform each point
        pairs.push(`\${x + (${(x - centerX).toFixed(2)}) * scale},\${y + (${(y - centerY).toFixed(2)}) * scale}`)
      }
    }

    return `${prefix}${pairs.join(' ')}${suffix}`
  })

  // Handle path d attributes
  element = element.replace(/(<path[^>]*?d=")([^"]+)(")/gi, (match, prefix, pathData, suffix) => {
    // Note: Path data is complex to parse correctly
    // This is a simplified version that may not work for all path formats

    // Split path data into commands
    let result = ''
    let command = ''
    let params = ''
    let isRelative = false

    // Simple path parser (handles M, L, H, V, Z commands)
    const pathCommands = pathData.match(/[MLHVCSQTAZmlhvcsqtaz][^MLHVCSQTAZmlhvcsqtaz]*/g) || []

    for (const cmd of pathCommands) {
      command = cmd.charAt(0)
      params = cmd.substring(1).trim()
      isRelative = command.toLowerCase() === command

      // Keep Z/z command as is
      if (command.toUpperCase() === 'Z') {
        result += command
        continue
      }

      // Process the parameters for each command
      const values = params
        .split(/[\s,]+/)
        .filter(Boolean)
        .map(parseFloat)
      let newParams = ''

      switch (command.toUpperCase()) {
        case 'M': // moveto
        case 'L': // lineto
          for (let i = 0; i < values.length; i += 2) {
            if (i + 1 >= values.length) break

            const x = values[i]
            const y = values[i + 1]

            if (isRelative) {
              newParams += ` \${${x.toFixed(2)} * scale} \${${y.toFixed(2)} * scale}`
            } else {
              newParams += ` \${x + (${(x - centerX).toFixed(2)}) * scale} \${y + (${(y - centerY).toFixed(
                2
              )}) * scale}`
            }
          }
          break

        case 'H': // horizontal lineto
          for (const val of values) {
            if (isRelative) {
              newParams += ` \${${val.toFixed(2)} * scale}`
            } else {
              newParams += ` \${x + (${(val - centerX).toFixed(2)}) * scale}`
            }
          }
          break

        case 'V': // vertical lineto
          for (const val of values) {
            if (isRelative) {
              newParams += ` \${${val.toFixed(2)} * scale}`
            } else {
              newParams += ` \${y + (${(val - centerY).toFixed(2)}) * scale}`
            }
          }
          break

        case 'C': // cubic Bézier curve
          for (let i = 0; i < values.length; i += 6) {
            if (i + 5 >= values.length) break

            // Each cubic bezier has 3 coordinate pairs: control point 1, control point 2, end point
            const x1 = values[i]
            const y1 = values[i + 1]
            const x2 = values[i + 2]
            const y2 = values[i + 3]
            const x = values[i + 4]
            const y = values[i + 5]

            if (isRelative) {
              // For relative coordinates, we just scale them
              newParams += ` \${${x1.toFixed(2)} * scale} \${${y1.toFixed(2)} * scale} \${${x2.toFixed(
                2
              )} * scale} \${${y2.toFixed(2)} * scale} \${${x.toFixed(2)} * scale} \${${y.toFixed(2)} * scale}`
            } else {
              // For absolute coordinates, we translate relative to center and scale
              newParams += ` \${x + (${(x1 - centerX).toFixed(2)}) * scale} \${y + (${(y1 - centerY).toFixed(
                2
              )}) * scale} \${x + (${(x2 - centerX).toFixed(2)}) * scale} \${y + (${(y2 - centerY).toFixed(
                2
              )}) * scale} \${x + (${(x - centerX).toFixed(2)}) * scale} \${y + (${(y - centerY).toFixed(2)}) * scale}`
            }
          }
          break

        case 'S': // smooth cubic Bézier curve
          for (let i = 0; i < values.length; i += 4) {
            if (i + 3 >= values.length) break

            // Each smooth cubic bezier has 2 coordinate pairs: control point 2, end point
            const x2 = values[i]
            const y2 = values[i + 1]
            const x = values[i + 2]
            const y = values[i + 3]

            if (isRelative) {
              newParams += ` \${${x2.toFixed(2)} * scale} \${${y2.toFixed(2)} * scale} \${${x.toFixed(
                2
              )} * scale} \${${y.toFixed(2)} * scale}`
            } else {
              newParams += ` \${x + (${(x2 - centerX).toFixed(2)}) * scale} \${y + (${(y2 - centerY).toFixed(
                2
              )}) * scale} \${x + (${(x - centerX).toFixed(2)}) * scale} \${y + (${(y - centerY).toFixed(2)}) * scale}`
            }
          }
          break

        case 'Q': // quadratic Bézier curve
          for (let i = 0; i < values.length; i += 4) {
            if (i + 3 >= values.length) break

            // Each quadratic bezier has 2 coordinate pairs: control point, end point
            const x1 = values[i]
            const y1 = values[i + 1]
            const x = values[i + 2]
            const y = values[i + 3]

            if (isRelative) {
              newParams += ` \${${x1.toFixed(2)} * scale} \${${y1.toFixed(2)} * scale} \${${x.toFixed(
                2
              )} * scale} \${${y.toFixed(2)} * scale}`
            } else {
              newParams += ` \${x + (${(x1 - centerX).toFixed(2)}) * scale} \${y + (${(y1 - centerY).toFixed(
                2
              )}) * scale} \${x + (${(x - centerX).toFixed(2)}) * scale} \${y + (${(y - centerY).toFixed(2)}) * scale}`
            }
          }
          break

        case 'T': // smooth quadratic Bézier curve
          for (let i = 0; i < values.length; i += 2) {
            if (i + 1 >= values.length) break

            // Each smooth quadratic bezier has 1 coordinate pair: end point
            const x = values[i]
            const y = values[i + 1]

            if (isRelative) {
              newParams += ` \${${x.toFixed(2)} * scale} \${${y.toFixed(2)} * scale}`
            } else {
              newParams += ` \${x + (${(x - centerX).toFixed(2)}) * scale} \${y + (${(y - centerY).toFixed(
                2
              )}) * scale}`
            }
          }
          break

        case 'A': // elliptical arc
          for (let i = 0; i < values.length; i += 7) {
            if (i + 6 >= values.length) break

            // Each arc has: rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y
            const rx = values[i]
            const ry = values[i + 1]
            const xAxisRotation = values[i + 2]
            const largeArcFlag = values[i + 3]
            const sweepFlag = values[i + 4]
            const x = values[i + 5]
            const y = values[i + 6]

            // Scale the radii
            const scaledRx = `\${${rx.toFixed(2)} * scale}`
            const scaledRy = `\${${ry.toFixed(2)} * scale}`

            // Keep flags as is
            // Transform end point
            let endPoint
            if (isRelative) {
              endPoint = `\${${x.toFixed(2)} * scale} \${${y.toFixed(2)} * scale}`
            } else {
              endPoint = `\${x + (${(x - centerX).toFixed(2)}) * scale} \${y + (${(y - centerY).toFixed(2)}) * scale}`
            }

            newParams += ` ${scaledRx} ${scaledRy} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${endPoint}`
          }
          break

        // For other commands, we'd need more complex handling
        default:
          newParams = params // Fallback: keep as is (may not work correctly)
          console.warn(`Warning: Path command '${command}' is not fully supported by the converter`)
          break
      }

      result += command + newParams.trim()
    }

    return `${prefix}${result}${suffix}`
  })

  // Replace fill colors with the dynamic color parameter
  element = element.replace(/fill="[^"]+"/gi, 'fill="${color}"')
  element = element.replace(/stroke="[^"]+"/gi, 'stroke="${color}"')

  return element
}

/**
 * Convert an SVG file to a Tycho shape definition
 */
async function convertSvgToTychoShape(filePath: string, options: ConversionOptions = {}): Promise<string> {
  // Set default options
  const {
    id = path.basename(filePath, '.svg').replace(/[^a-zA-Z0-9]/g, ''),
    name = path.basename(filePath, '.svg').replace(/[0-9]+\s+/, ''), // Remove numbers and spaces at the beginning
    category = 'custom',
    outputPath = './'
  } = options

  try {
    // Read the SVG file
    const svgContent = await fs.promises.readFile(filePath, 'utf8')

    // Extract the SVG content and dimensions
    const { content, width, height } = extractSvgContent(svgContent)

    // Process the SVG content
    const processedContent = processSvgElement(content, width, height)

    // Generate the shape definition
    const shapeDefinition = `
import type { ShapeDefinition } from '@/types/index';

/**
 * Shape converted from: ${path.basename(filePath)}
 * Original dimensions: ${width}x${height}
 */
const ${id}: ShapeDefinition = {
  id: '${id}',
  name: '${name}',
  category: '${category}',
  render(x, y, size, color) {
    // Scale factor based on original SVG size and desired size
    const scale = size / ${Math.max(width, height)};
    
    // Return the SVG content with dynamic sizing and positioning
    return \`${processedContent}\`;
  }
};

export default ${id};
`.trim()

    // Determine output file path
    const outputFile = path.join(outputPath, `${id}.ts`)

    // Write the output file
    await fs.promises.writeFile(outputFile, shapeDefinition)

    console.log(`Successfully converted ${filePath} to ${outputFile}`)

    return shapeDefinition
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error)
    throw error
  }
}

/**
 * Register converter function as a batch processor
 */
async function convertMultipleSvgs(filePaths: string[], options: ConversionOptions = {}): Promise<void> {
  for (const filePath of filePaths) {
    try {
      await convertSvgToTychoShape(filePath, options)
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error)
    }
  }
  console.log(`Processed ${filePaths.length} SVG files`)
}

/**
 * Main function to handle CLI usage
 */
async function main() {
  const args = process.argv.slice(2)

  if (args.length === 0) {
    console.log(`
SVG to Tycho Shape Converter

Usage:
  bun svg-converter.ts [options] <file.svg>

Options:
  --id <id>         Shape ID (default: filename without extension)
  --name <name>     Shape display name (default: filename without extension)
  --category <cat>  Shape category (default: 'custom')
  --output <path>   Output directory (default: './')

Example:
  bun svg-converter.ts --category tech --name "Tech Square" my-square.svg
`)
    return
  }

  // Parse command line arguments
  const options: ConversionOptions = {}
  const files: string[] = []

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg.startsWith('--')) {
      const option = arg.substring(2)
      if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
        options[option as keyof ConversionOptions] = args[i + 1]
        i++
      }
    } else {
      files.push(arg)
    }
  }

  // Process files
  for (const file of files) {
    try {
      await convertSvgToTychoShape(file, options)
    } catch (error) {
      console.error(`Error processing ${file}:`, error)
    }
  }
}

// Check if this is being run directly
const isMainModule = import.meta.url === `file://${process.argv[1]}`

// Run the script if executed directly
if (isMainModule) {
  main().catch(console.error)
}

// Export functions for use in other scripts
export { convertSvgToTychoShape, convertMultipleSvgs }
