import { useState, type FC } from 'react'

import { usePatternGenerator } from '@/hooks/usePatternGenerator'
import type { PatternConfig } from '@/types/index'

import SVGPreview from './svg-preview'
import { Input } from '../ui/input'
import { Slider } from '../ui/slider'
import { Card, CardContent } from '../ui/card'
import { Label } from '../ui/label'

const PatternGenerator: FC = () => {
  const [config, setConfig] = useState<PatternConfig>({
    seed: 'default',
    shapeSize: 8,
    mainColor: '#0066ff',
    backgroundColor: '#000000',
    rows: 40,
    columns: 60,
    density: 0.5,
    noiseScale: 0.1,
    patternStyle: 'geo',
    shapeCollection: 'basic',
    useVariableSize: true,
    useVariableOpacity: true
  })

  const { svg, exportSVG } = usePatternGenerator(config)

  const updateConfig = (changes: Partial<PatternConfig>) => {
    setConfig((prevConfig) => ({ ...prevConfig, ...changes }))
  }

  return (
    <div className="flex flex-col">
      <SVGPreview svg={svg} />

      <div className="container mx-auto max-w-xl">
        <Card className="bg-card/50">
          <CardContent>
            {/* Seed Input */}
            <Label htmlFor="seed">Seed</Label>
            <Input id="seed" value={config.seed} onChange={(e) => updateConfig({ seed: e.target.value })} />

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
    </div>
  )
}

export default PatternGenerator
