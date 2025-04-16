import { useEffect, useState, type FC } from 'react'

import PatternGenerator from '@/components/generator/pattern-generator'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from './components/ui/slider'
import { registerDefaultCollections } from '@/lib/collections/default'
import { registerBasicShapes } from '@/lib/shapes/basic'
import { registerMarathonShapes } from '@/lib/shapes/marathon'

import './index.css'
import { Input } from './components/ui/input'

export const App: FC = () => {
  // Add state to track when registrations are complete
  const [registrationsComplete, setRegistrationsComplete] = useState(false)

  // Register shapes and collections before rendering pattern generator
  useEffect(() => {
    console.log('Initializing registries...')

    // First register the shapes
    registerBasicShapes()
    registerMarathonShapes()

    // Then register the collections
    registerDefaultCollections()

    console.log('Registries initialized')
    setRegistrationsComplete(true)
  }, [])

  return (
    <div className="flex flex-col min-h-full">
      <div className="grid w-full h-full items-center justify-center grid-cols-1 grid-rows-[56px_auto] isolate">
        <nav className="bg-lime-400 text-zinc-950 h-14">TYCHO</nav>
        {registrationsComplete ? <PatternGenerator /> : <div className="text-center py-8">Initializing...</div>}

        {/* <Card className="bg-card/50 backdrop-blur-sm border-muted">
        <CardContent className="pt-6">
        <h1 className="text-5xl font-bold my-4 leading-tight">Bun + React</h1>
        <p>
        Edit{' '}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">src/App.tsx</code> and
        save to test HMR
        </p>
        <APITester />
        </CardContent>
        </Card> */}
      </div>
    </div>
  )
}

export default App
