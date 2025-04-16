import { useState, type FC } from 'react'

interface SVGPreviewProps {
  svg: string
  height?: string
  width?: string
  backgroundColor?: string
}

const SVGPreview: FC<SVGPreviewProps> = ({ svg, height = '480px', width = '720px', backgroundColor = '#000000' }) => {
  const [isFullscreen, setIsFullScreen] = useState(false)

  // Toggle fullscreen preview.
  const toggleFullscreen = () => {
    setIsFullScreen((prev) => !prev)
  }

  // Style for the SVG element.
  const svgStyle = {}

  return (
    <div className="">
      <div
        className={`relative ${isFullscreen ? 'fullscreen' : ''}`}
        style={{
          height: isFullscreen ? '100vh' : height,
          width: isFullscreen ? '100vw' : width,
          // backgroundColor: backgroundColor,
          overflow: 'hidden',
          cursor: isFullscreen ? 'zoom-out' : 'zoom-in'
        }}
        onClick={toggleFullscreen}>
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            ...svgStyle
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>
    </div>
  )
}

export default SVGPreview
