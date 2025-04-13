import { useState, type FC } from 'react'

import { usePatternGenerator } from '@/hooks/usePatternGenerator'
import type { PatternConfig } from '@/types/index'

import SVGPreview from './svg-preview'

const PatternGenerator: FC = () => {
  const [config, setConfig] = useState<PatternConfig>({
    seed: 'default',
    shapeSize: 8,
    mainColor: '#0066ff',
    backgroundColor: '#000000',
    rows: 30,
    columns: 40,
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
    </div>
  )
}

export default PatternGenerator
