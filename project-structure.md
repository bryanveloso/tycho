# Geographic Dot Matrix Generator - Project Structure

## Project Setup

```bash
# Create a new React project with TypeScript
npx create-react-app geo-pattern-generator --template typescript

# Navigate to project directory
cd geo-pattern-generator

# Install dependencies
npm install lodash @types/lodash
npm install react-colorful   # For better color pickers
npm install file-saver       # For exporting SVGs
```

## Directory Structure

```
src/
├── components/             # UI Components
│   ├── PatternGenerator/   # Main component
│   ├── SVGPreview/         # SVG preview component
│   ├── controls/           # UI control components
│   └── common/             # Reusable UI components
│
├── lib/                    # Core libraries
│   ├── shapes/             # Shape definitions
│   ├── collections/        # Shape collections
│   ├── patterns/           # Pattern generation algorithms
│   └── noise/              # Noise generation utilities
│
├── hooks/                  # Custom React hooks
│   └── usePatternGenerator.ts
│
├── types/                  # TypeScript type definitions
│   └── index.ts
│
├── utils/                  # Utility functions
│   ├── hash.ts
│   ├── color.ts
│   └── export.ts
│
├── App.tsx                 # Main application
└── index.tsx               # Entry point
```

## Core Type Definitions

```typescript
// src/types/index.ts

export type Point = {
  x: number;
  y: number;
};

export interface ShapeDefinition {
  id: string;
  name: string;
  category: ShapeCategory;
  render: (x: number, y: number, size: number, color: string) => string;
  tags?: string[];
}

export type ShapeCategory = 
  | 'basic'
  | 'tech'
  | 'geometric'
  | 'ascii'
  | 'minimal'
  | 'custom';

export interface ShapeCollection {
  id: string;
  name: string;
  description: string;
  shapes: string[];  // IDs of shapes in this collection
}

export interface PatternConfig {
  seed: string;
  shapeSize: number;
  mainColor: string;
  backgroundColor: string;
  rows: number;
  columns: number;
  density: number;
  noiseScale: number;
  patternStyle: 'geo' | 'random' | 'grid';
  shapeCollection: string;
  useVariableSize: boolean;
  useVariableOpacity: boolean;
}

export interface PatternElement {
  x: number;
  y: number;
  intensity: number;
  shape: string;
}
```

## Shape Library Design

```typescript
// src/lib/shapes/ShapeRegistry.ts
import { ShapeDefinition } from '../../types';

class ShapeRegistry {
  private shapes: Map<string, ShapeDefinition> = new Map();

  register(shape: ShapeDefinition): void {
    if (this.shapes.has(shape.id)) {
      console.warn(`Shape with ID ${shape.id} is already registered. It will be overwritten.`);
    }
    this.shapes.set(shape.id, shape);
  }

  get(id: string): ShapeDefinition | undefined {
    return this.shapes.get(id);
  }

  getAll(): ShapeDefinition[] {
    return Array.from(this.shapes.values());
  }

  getByCategory(category: string): ShapeDefinition[] {
    return this.getAll().filter(shape => shape.category === category);
  }
}

// Create and export a singleton instance
export const shapeRegistry = new ShapeRegistry();
```

```typescript
// src/lib/shapes/basicShapes.ts
import { shapeRegistry } from './ShapeRegistry';
import { ShapeDefinition } from '../../types';

// Register square shape
const square: ShapeDefinition = {
  id: 'square',
  name: 'Square',
  category: 'basic',
  render: (x: number, y: number, size: number, color: string) => {
    return `<rect x="${x - size/2}" y="${y - size/2}" width="${size}" height="${size}" fill="${color}" />`;
  }
};

// Register circle shape
const circle: ShapeDefinition = {
  id: 'circle',
  name: 'Circle',
  category: 'basic',
  render: (x: number, y: number, size: number, color: string) => {
    return `<circle cx="${x}" cy="${y}" r="${size/2}" fill="${color}" />`;
  }
};

// Register x shape
const x: ShapeDefinition = {
  id: 'x',
  name: 'X Mark',
  category: 'basic',
  render: (x: number, y: number, size: number, color: string) => {
    const thickness = size / 5;
    const halfSize = size / 2;
    const halfThick = thickness / 2;
    return `
      <polygon points="${x-halfSize-halfThick},${y-halfSize} ${x-halfSize+halfThick},${y-halfSize} ${x+halfSize-halfThick},${y+halfSize} ${x+halfSize+halfThick},${y+halfSize}" fill="${color}" />
      <polygon points="${x+halfSize-halfThick},${y-halfSize} ${x+halfSize+halfThick},${y-halfSize} ${x-halfSize-halfThick},${y+halfSize} ${x-halfSize+halfThick},${y+halfSize}" fill="${color}" />
    `;
  }
};

// Register hollow square shape
const hollowSquare: ShapeDefinition = {
  id: 'hollowSquare',
  name: 'Hollow Square',
  category: 'basic',
  render: (x: number, y: number, size: number, color: string) => {
    const halfSize = size / 2;
    const strokeWidth = Math.max(1, size / 6);
    return `<rect x="${x - halfSize}" y="${y - halfSize}" width="${size}" height="${size}" stroke="${color}" stroke-width="${strokeWidth}" fill="none" />`;
  }
};

// Register all basic shapes
export function registerBasicShapes() {
  shapeRegistry.register(square);
  shapeRegistry.register(circle);
  shapeRegistry.register(x);
  shapeRegistry.register(hollowSquare);
  // Add more basic shapes here
}
```

```typescript
// src/lib/shapes/techShapes.ts
import { shapeRegistry } from './ShapeRegistry';
import { ShapeDefinition } from '../../types';

// Register dot shape
const dot: ShapeDefinition = {
  id: 'dot',
  name: 'Dot',
  category: 'tech',
  render: (x: number, y: number, size: number, color: string) => {
    return `<circle cx="${x}" cy="${y}" r="${size/6}" fill="${color}" />`;
  }
};

// Register bracket shape
const bracket: ShapeDefinition = {
  id: 'bracket',
  name: 'Bracket',
  category: 'tech',
  render: (x: number, y: number, size: number, color: string) => {
    const halfSize = size / 2;
    const strokeWidth = Math.max(1, size / 6);
    const inset = strokeWidth * 1.5;
    return `
      <path d="M ${x - halfSize + inset} ${y - halfSize} 
               L ${x - halfSize} ${y - halfSize} 
               L ${x - halfSize} ${y + halfSize} 
               L ${x - halfSize + inset} ${y + halfSize}" 
               stroke="${color}" stroke-width="${strokeWidth}" fill="none" />
      <path d="M ${x + halfSize - inset} ${y - halfSize} 
               L ${x + halfSize} ${y - halfSize} 
               L ${x + halfSize} ${y + halfSize} 
               L ${x + halfSize - inset} ${y + halfSize}" 
               stroke="${color}" stroke-width="${strokeWidth}" fill="none" />
    `;
  }
};

// Register all tech shapes
export function registerTechShapes() {
  shapeRegistry.register(dot);
  shapeRegistry.register(bracket);
  // Add more tech shapes here
}
```

## Shape Collections Design

```typescript
// src/lib/collections/CollectionRegistry.ts
import { ShapeCollection } from '../../types';

class CollectionRegistry {
  private collections: Map<string, ShapeCollection> = new Map();

  register(collection: ShapeCollection): void {
    if (this.collections.has(collection.id)) {
      console.warn(`Collection with ID ${collection.id} is already registered. It will be overwritten.`);
    }
    this.collections.set(collection.id, collection);
  }

  get(id: string): ShapeCollection | undefined {
    return this.collections.get(id);
  }

  getAll(): ShapeCollection[] {
    return Array.from(this.collections.values());
  }
}

// Create and export a singleton instance
export const collectionRegistry = new CollectionRegistry();
```

```typescript
// src/lib/collections/defaultCollections.ts
import { collectionRegistry } from './CollectionRegistry';
import { ShapeCollection } from '../../types';

// Register the Marathon collection
const marathon: ShapeCollection = {
  id: 'marathon',
  name: 'Marathon',
  description: 'The default collection inspired by the Marathon game stream visuals',
  shapes: ['square', 'hollowSquare', 'x', 'dot']
};

// Register the Tech collection
const tech: ShapeCollection = {
  id: 'tech',
  name: 'Tech',
  description: 'A collection of technical-looking shapes',
  shapes: ['hollowSquare', 'dot', 'corner', 'plus']
};

// Register all default collections
export function registerDefaultCollections() {
  collectionRegistry.register(marathon);
  collectionRegistry.register(tech);
  // Add more collections here
}
```

## Pattern Generation Hook

```typescript
// src/hooks/usePatternGenerator.ts
import { useState, useEffect } from 'react';
import { PatternConfig, PatternElement } from '../types';
import { simpleHash } from '../utils/hash';
import { shapeRegistry } from '../lib/shapes/ShapeRegistry';
import { collectionRegistry } from '../lib/collections/CollectionRegistry';
import { generateNoise } from '../lib/noise/noiseGenerators';

export function usePatternGenerator(config: PatternConfig) {
  const [svg, setSvg] = useState<string>('');
  const [elements, setElements] = useState<PatternElement[]>([]);

  useEffect(() => {
    // Generate the pattern elements
    const newElements = generatePatternElements(config);
    setElements(newElements);
    
    // Generate the SVG
    const svgContent = generateSVG(newElements, config);
    setSvg(svgContent);
  }, [config]);

  // Generate pattern elements based on config
  const generatePatternElements = (config: PatternConfig): PatternElement[] => {
    const elements: PatternElement[] = [];
    
    // ... pattern generation code based on the config ...
    
    return elements;
  };

  // Generate SVG from pattern elements
  const generateSVG = (elements: PatternElement[], config: PatternConfig): string => {
    const { shapeSize, backgroundColor, columns, rows } = config;
    
    // Calculate SVG dimensions
    const svgWidth = columns * shapeSize * 1.5;
    const svgHeight = rows * shapeSize * 1.5;
    
    // Start SVG content
    let svgContent = `<svg viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${backgroundColor}" />`;
    
    // Add each element to the SVG
    elements.forEach(element => {
      // ... SVG rendering code for each element ...
    });
    
    // Close SVG tag
    svgContent += '</svg>';
    
    return svgContent;
  };

  // Function to export the SVG
  const exportSVG = () => {
    // ... code to export SVG as file ...
  };

  return {
    svg,
    elements,
    exportSVG
  };
}
```

## Main Component

```typescript
// src/components/PatternGenerator/PatternGenerator.tsx
import React, { useState } from 'react';
import { PatternConfig } from '../../types';
import { usePatternGenerator } from '../../hooks/usePatternGenerator';
import SVGPreview from '../SVGPreview/SVGPreview';
import SeedControl from '../controls/SeedControl';
import ShapeControls from '../controls/ShapeControls';
import PatternControls from '../controls/PatternControls';
import ColorControls from '../controls/ColorControls';

const PatternGenerator: React.FC = () => {
  // Initialize with default config
  const [config, setConfig] = useState<PatternConfig>({
    seed: 'marathon',
    shapeSize: 8,
    mainColor: '#0066ff',
    backgroundColor: '#000000',
    rows: 30,
    columns: 40,
    density: 0.5,
    noiseScale: 0.1,
    patternStyle: 'geo',
    shapeCollection: 'marathon',
    useVariableSize: true,
    useVariableOpacity: true
  });
  
  // Use the pattern generator hook
  const { svg, exportSVG } = usePatternGenerator(config);
  
  // Update config helper function
  const updateConfig = (changes: Partial<PatternConfig>) => {
    setConfig(prevConfig => ({ ...prevConfig, ...changes }));
  };

  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-100 rounded-lg">
      <SVGPreview svg={svg} />
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <SeedControl 
            seed={config.seed} 
            onChange={(seed) => updateConfig({ seed })} 
          />
          
          <ShapeControls 
            shapeSize={config.shapeSize}
            shapeCollection={config.shapeCollection}
            useVariableSize={config.useVariableSize}
            useVariableOpacity={config.useVariableOpacity}
            onChange={(changes) => updateConfig(changes)}
          />
        </div>
        
        <div className="space-y-4">
          <PatternControls 
            patternStyle={config.patternStyle}
            rows={config.rows}
            columns={config.columns}
            density={config.density}
            noiseScale={config.noiseScale}
            onChange={(changes) => updateConfig(changes)} 
          />
          
          <ColorControls 
            mainColor={config.mainColor}
            backgroundColor={config.backgroundColor}
            onChange={(changes) => updateConfig(changes)}
          />
        </div>
      </div>
      
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => updateConfig({ seed: Math.random().toString(36).substring(2, 8) })}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Randomize Seed
        </button>
        
        <button
          onClick={exportSVG}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Export SVG
        </button>
      </div>
    </div>
  );
};

export default PatternGenerator;
```

## Application Initialization

```typescript
// src/App.tsx
import React, { useEffect } from 'react';
import PatternGenerator from './components/PatternGenerator/PatternGenerator';
import { registerBasicShapes } from './lib/shapes/basicShapes';
import { registerTechShapes } from './lib/shapes/techShapes';
import { registerDefaultCollections } from './lib/collections/defaultCollections';

const App: React.FC = () => {
  // Initialize all shape libraries and collections
  useEffect(() => {
    // Register all shapes
    registerBasicShapes();
    registerTechShapes();
    
    // Register all collections
    registerDefaultCollections();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Geographic Dot Matrix Generator</h1>
        <p className="text-gray-600">Create beautiful dot matrix patterns for your projects</p>
      </header>
      
      <main>
        <PatternGenerator />
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Inspired by Marathon Gameplay Reveal visuals</p>
      </footer>
    </div>
  );
};

export default App;
```
