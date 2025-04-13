# Shape Creation Guide

This guide explains how to create and implement custom shapes for Tycho. Whether you're a developer adding shapes directly to the codebase or a designer creating shapes in external tools, this document will walk you through the process.

## Table of Contents

1. [Understanding the Shape System](#understanding-the-shape-system)
2. [Shape Requirements](#shape-requirements)
3. [Creating Shapes in Code](#creating-shapes-in-code)
4. [Creating Shapes in Design Tools](#creating-shapes-in-design-tools)
5. [Converting Design Tool Shapes to Code](#converting-design-tool-shapes-to-code)
6. [Testing Your Shapes](#testing-your-shapes)
7. [Advanced Shape Techniques](#advanced-shape-techniques)
8. [Troubleshooting](#troubleshooting)

## Understanding the Shape System

Tycho uses SVG (Scalable Vector Graphics) to render various geometric shapes within a pattern. Each shape is defined as a function that generates SVG markup based on the following parameters:

- `x` and `y`: The center coordinates where the shape should be placed
- `size`: The overall size of the shape (shapes are designed to fit within a square of this size)
- `color`: The color to apply to the shape (as a CSS color value, e.g., "#ff0000" or "rgba(255,0,0,0.5)")

The rendering system handles positioning and scaling automatically, so you only need to focus on defining the shape's geometry relative to its center point.

## Shape Requirements

All shapes must meet these requirements to work properly:

1. **Center Alignment**: Each shape must be centered around the provided (x, y) coordinates
2. **Size Scaling**: Shapes must scale proportionally based on the size parameter
3. **Color Application**: Shapes must apply the provided color correctly
4. **Valid SVG**: Shapes must output valid SVG markup
5. **Optimization**: Shapes should be as simple as possible for performance reasons

## Creating Shapes in Code

### Basic Shape Structure

To add a new shape to the codebase, you'll create a new shape definition in the appropriate file. Here's the basic structure:

```typescript
const myShape: ShapeDefinition = {
  id: 'myShape', // Unique identifier for the shape
  name: 'My Shape', // Display name
  category: 'basic', // Category (basic, tech, etc.)
  render(x, y, size, color) {
    // Generate and return SVG markup here
    return `<svg-element-here />`
  }
}
```

### Example Shapes

Here are examples of different shape types:

#### Simple Rectangle

```typescript
const square: ShapeDefinition = {
  id: 'square',
  name: 'Square',
  category: 'basic',
  render(x, y, size, color) {
    // Calculate position (top-left corner) from center point
    const halfSize = size / 2
    return `<rect x="${x - halfSize}" y="${y - halfSize}" width="${size}" height="${size}" fill="${color}" />`
  }
}
```

#### Circle

```typescript
const circle: ShapeDefinition = {
  id: 'circle',
  name: 'Circle',
  category: 'basic',
  render(x, y, size, color) {
    return `<circle cx="${x}" cy="${y}" r="${size / 2}" fill="${color}" />`
  }
}
```

#### Polygon (Triangle)

```typescript
const triangle: ShapeDefinition = {
  id: 'triangle',
  name: 'Triangle',
  category: 'basic',
  render(x, y, size, color) {
    const halfSize = size / 2
    // Define points for an equilateral triangle
    return `<polygon points="${x},${y - halfSize} ${x - halfSize},${y + halfSize} ${x + halfSize},${
      y + halfSize
    }" fill="${color}" />`
  }
}
```

#### Path-based Shape (Star)

```typescript
const star: ShapeDefinition = {
  id: 'star',
  name: 'Star',
  category: 'special',
  render(x, y, size, color) {
    const outerRadius = size / 2
    const innerRadius = outerRadius / 2.5

    // Generate points for a 5-pointed star
    let points = ''
    for (let i = 0; i < 10; i++) {
      // Alternate between outer and inner radius
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI / 5) * i
      const pointX = x + radius * Math.sin(angle)
      const pointY = y - radius * Math.cos(angle)
      points += `${pointX},${pointY} `
    }

    return `<polygon points="${points.trim()}" fill="${color}" />`
  }
}
```

#### Stroke-based Shape (Hollow Circle)

```typescript
const hollowCircle: ShapeDefinition = {
  id: 'hollowCircle',
  name: 'Hollow Circle',
  category: 'basic',
  render(x, y, size, color) {
    // Calculate stroke width based on size
    const strokeWidth = Math.max(1, size / 6)
    return `<circle cx="${x}" cy="${y}" r="${
      size / 2 - strokeWidth / 2
    }" stroke="${color}" stroke-width="${strokeWidth}" fill="none" />`
  }
}
```

### Registering Your Shape

After creating your shape definitions, you need to register them so they can be used in the application:

```typescript
// In a file like src/lib/shapes/myShapes.ts
import { shapeRegistry } from './registry'
import type { ShapeDefinition } from '@/types/index'

// Define your shapes here...

export function registerMyShapes() {
  shapeRegistry.register([myShape1, myShape2, myShape3])
}

// Then in src/App.tsx or another initialization file
import { registerMyShapes } from '@/lib/shapes/myShapes'

// In your initialization code
registerMyShapes()
```

## Creating Shapes in Design Tools

If you prefer to design shapes in tools like Figma, Adobe Illustrator, or Sketch, follow these guidelines:

### Guidelines for Design Tools

1. **Canvas Setup**:

   - Create a canvas with a fixed size (e.g., 100x100px)
   - Place your shape in the center of the canvas

2. **Shape Design**:

   - Design your shape to fit within the canvas bounds
   - Keep your shape centered around the middle point
   - Use simple paths and basic SVG elements when possible
   - Avoid gradients and complex effects that may not scale well

3. **Exporting**:
   - Export your design as an SVG file
   - If possible, clean up the SVG code to remove unnecessary elements and attributes

### Figma Workflow

1. Create a new frame (100x100px)
2. Design your shape in the center
3. Select the shape and export as SVG
4. Open the SVG file in a text editor

### Adobe Illustrator Workflow

1. Create a new document (100x100px)
2. Enable the grid and snap to grid
3. Design your shape centered in the artboard
4. File > Export > Export As... > SVG
5. In the SVG Options dialog:
   - Choose "SVG 1.1"
   - Set "Decimal Places" to 1-2 for optimization
   - Enable "Responsive"

## Converting Design Tool Shapes to Code

After exporting your shape from a design tool, you'll need to convert it to code that works with the pattern generator.

### Basic Conversion Process

1. Export your shape as an SVG file
2. Open the SVG file in a text editor
3. Extract the relevant SVG elements (paths, polygons, etc.)
4. Modify the SVG elements to use the parameters (x, y, size, color)
5. Implement the shape definition with the modified SVG

### Example Conversion

Let's say you've exported this SVG of a simple star from a design tool:

```svg
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <polygon points="50,10 61,35 90,35 65,55 75,80 50,65 25,80 35,55 10,35 39,35" fill="black"/>
</svg>
```

To convert this to a shape definition:

1. Identify the main element (a polygon in this case)
2. Normalize the coordinates to be centered at (0,0) with a size of 1
3. Scale and translate them using the parameters

```typescript
const star: ShapeDefinition = {
  id: 'star',
  name: 'Star',
  category: 'special',
  render(x, y, size, color) {
    // Original points were designed for a 100x100 canvas with center at (50,50)
    // We need to normalize and then transform them
    const scale = size / 100

    // Original points: "50,10 61,35 90,35 65,55 75,80 50,65 25,80 35,55 10,35 39,35"
    const originalPoints = [
      [50, 10],
      [61, 35],
      [90, 35],
      [65, 55],
      [75, 80],
      [50, 65],
      [25, 80],
      [35, 55],
      [10, 35],
      [39, 35]
    ]

    // Transform points to use our center and scale
    const transformedPoints = originalPoints
      .map(([px, py]) => {
        // First translate to origin (-50, -50), then scale, then translate to target (x, y)
        const tx = x + (px - 50) * scale
        const ty = y + (py - 50) * scale
        return `${tx},${ty}`
      })
      .join(' ')

    return `<polygon points="${transformedPoints}" fill="${color}" />`
  }
}
```

## Testing Your Shapes

Before finalizing your shapes, you should test them to ensure they work properly:

1. **Visual Testing**:

   - Test your shapes with different sizes to ensure they scale correctly
   - Test with different colors to ensure color is applied correctly
   - Test with different opacity levels if your application supports it

2. **Performance Testing**:
   - Test with many instances of your shape to ensure good performance
   - Optimize complex shapes if they cause performance issues

## Advanced Shape Techniques

### Compound Shapes

You can create more complex shapes by combining multiple SVG elements:

```typescript
const cross: ShapeDefinition = {
  id: 'cross',
  name: 'Cross',
  category: 'basic',
  render(x, y, size, color) {
    const thickness = size / 3
    const halfThick = thickness / 2
    const halfSize = size / 2

    return `
      <rect x="${x - halfThick}" y="${y - halfSize}" width="${thickness}" height="${size}" fill="${color}" />
      <rect x="${x - halfSize}" y="${y - halfThick}" width="${size}" height="${thickness}" fill="${color}" />
    `
  }
}
```

### Parametric Shapes

You can use mathematics to generate shapes procedurally:

```typescript
const gear: ShapeDefinition = {
  id: 'gear',
  name: 'Gear',
  category: 'tech',
  render(x, y, size, color) {
    const outerRadius = size / 2
    const innerRadius = outerRadius * 0.7
    const teethCount = 8

    let points = ''
    for (let i = 0; i < teethCount * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius
      const angle = (Math.PI / teethCount) * i
      const pointX = x + radius * Math.cos(angle)
      const pointY = y + radius * Math.sin(angle)
      points += `${pointX},${pointY} `
    }

    return `<polygon points="${points.trim()}" fill="${color}" />`
  }
}
```

### Animation Support

If your application supports it, you can add animation to shapes:

```typescript
const pulsatingCircle: ShapeDefinition = {
  id: 'pulsatingCircle',
  name: 'Pulsating Circle',
  category: 'animated',
  render(x, y, size, color) {
    const uniqueId = `pulse-${Math.random().toString(36).substring(2, 9)}`
    return `
      <circle cx="${x}" cy="${y}" r="${size / 2}">
        <animate 
          attributeName="r" 
          values="${(size / 2) * 0.8};${size / 2};${(size / 2) * 0.8}" 
          dur="2s" 
          repeatCount="indefinite" />
        <animate 
          attributeName="fill-opacity" 
          values="1;0.5;1" 
          dur="2s" 
          repeatCount="indefinite" />
        <animate 
          attributeName="fill" 
          values="${color};${color}" 
          dur="2s" 
          repeatCount="indefinite" />
      </circle>
    `
  }
}
```

## Troubleshooting

### Common Issues

1. **Shape not centered correctly**

   - Ensure all coordinates are calculated relative to the center point (x, y)
   - Check that all elements are properly positioned around this center

2. **Shape scaling issues**

   - Make sure all dimensions (width, height, radius, etc.) are calculated based on the size parameter
   - For complex shapes, normalize all coordinates relative to size

3. **Color not applied correctly**

   - Check that the color parameter is being used for all relevant attributes (fill, stroke, etc.)
   - For shapes with multiple elements, apply the color to all elements

4. **SVG rendering issues**
   - Validate your SVG syntax
   - Avoid unsupported SVG features
   - Keep shapes as simple as possible

### SVG Resources

- [MDN SVG Documentation](https://developer.mozilla.org/en-US/docs/Web/SVG)
- [SVG Element Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Element)
- [SVG Attribute Reference](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)

## Conclusion

Creating custom shapes for Tycho is a straightforward process once you understand the basic principles. By following this guide, you should be able to design, implement, and test your own shapes, whether you prefer coding them directly or designing them in external tools.

Remember that shapes should be kept relatively simple for best performance, especially when many instances of them will be rendered simultaneously in your patterns.
