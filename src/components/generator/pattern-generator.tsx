import { useState, type FC } from 'react'

import { usePatternGenerator } from '@/hooks/usePatternGenerator'
import type { PatternConfig } from '@/types/index'

import SVGPreview from './svg-preview'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const PatternGenerator: FC = () => {
  const [config, setConfig] = useState<PatternConfig>({
    seed: 'default',
    shapeSize: 8,
    mainColor: '#0066ff',
    backgroundColor: '#000000',
    rows: 48,
    columns: 72,
    density: 0.5,
    noiseScale: 0.1,
    patternStyle: 'geo',
    shapeCollection: 'marathon'
  })

  const { svg, exportSVG } = usePatternGenerator(config)

  const updateConfig = (changes: Partial<PatternConfig>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...changes }))
  }

  return (
    <main className="flex flex-col min-h-full">
      <div className="h-14 fixed top-0 justify-end items-center grow">BUTTON</div>
      <SVGPreview svg={svg} />

      <div className="container mx-auto max-w-xl">
        <Card>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {/* Seed Input */}
              <div>
                <Label htmlFor="seed">Seed</Label>
                <Input id="seed" value={config.seed} onChange={(e) => updateConfig({ seed: e.target.value })} />
              </div>

              {/* Shape Collection */}
              <div>
                <Label htmlFor="collections">Shape Collection</Label>
                <Select
                  value={config.shapeCollection}
                  onValueChange={(value) => updateConfig({ shapeCollection: value })}>
                  <SelectTrigger id="collections">
                    <SelectValue placeholder="Select shape collection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="marathon">Marathon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Pattern Style */}
              <div>
                <Label htmlFor="patternStyle">Pattern Style</Label>
                <Select
                  value={config.patternStyle}
                  onValueChange={(value) => updateConfig({ patternStyle: value as 'geo' | 'random' | 'grid' })}>
                  <SelectTrigger id="patternStyle">
                    <SelectValue placeholder="Select pattern style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geo">Geographic</SelectItem>
                    <SelectItem value="random">Random</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Shape Size Slider */}
            {/* Shape Density Slider */}
            <Label htmlFor="density">Density</Label>
            <Slider
              id="density"
              defaultValue={[config.density]}
              min={0.1}
              max={0.9}
              step={0.1}
              onValueChange={(e) => updateConfig({ density: e[0] })}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default PatternGenerator
