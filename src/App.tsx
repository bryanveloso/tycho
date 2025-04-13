import { useEffect, useState, type FC } from 'react'

import PatternGenerator from '@/components/generator/pattern-generator'
import { registerDefaultCollections } from '@/lib/collections/default'
import { registerBasicShapes } from '@/lib/shapes/basic'

import './index.css'

export const App: FC = () => {
  // Add state to track when registrations are complete
  const [registrationsComplete, setRegistrationsComplete] = useState(false)

  // Register shapes and collections before rendering pattern generator
  useEffect(() => {
    console.log('Initializing registries...')

    // First register the shapes
    registerBasicShapes()

    // Then register the collections
    registerDefaultCollections()

    console.log('Registries initialized')
    setRegistrationsComplete(true)
  }, [])

  return (
    <div className="container mx-auto p-8 text-center relative z-10">
      <main>
        {/* Only render the pattern generator once registrations are complete */}
        {registrationsComplete ? <PatternGenerator /> : <div className="text-center py-8">Initializing...</div>}
      </main>

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
  )
}

export default App
