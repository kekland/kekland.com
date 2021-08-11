import React, { useEffect, useRef, useState } from 'react';
import { useWindowScroll } from '../../../hooks/useWindowScroll';
import { useWindowSize } from '../../../hooks/useWindowSize';

import './Background.css';
import { draw, generateArcs, hexToRgbA } from './CanvasAnimation';

// eslint-disable-next-line no-unused-vars
export const Background = ({ skipAnimation }) => {
  const scroll = useWindowScroll()
  const [data, setData] = useState([])
  const ref = useRef()

  const windowSize = useWindowSize();

  const width = windowSize.width - 32
  const height = windowSize.height - 32

  const minSide = Math.min(width, height);

  useEffect(() => {
    if (data?.minRadius !== minSide / 3) {
      setData(
        generateArcs({
          num: 100,
          minRadius: minSide / 3,
          maxRadius: minSide / 2,
          minAngle: 0.3 * Math.PI,
          maxAngle: Math.PI,
          minPeriod: 5,
          maxPeriod: 15,
          colors: [
            hexToRgbA('#CA054D'),
            hexToRgbA('#084C61'),
          ],
        }),
      )
    }
  }, [windowSize])

  useEffect(() => {
    let animationFrameId

    const _draw = () => {
      if (!data.arcs) return

      draw({
        arcs: data.arcs,
        ctx: ref.current.getContext('2d'),
        width,
        height,
        fadeIn: !skipAnimation,
        transparentStopMultiplier: 1.0 + scroll / 600.0,
      })

      animationFrameId = window.requestAnimationFrame(_draw)
    }

    animationFrameId = window.requestAnimationFrame(_draw)
    return () => window.cancelAnimationFrame(animationFrameId)
  }, [data, windowSize, scroll])

  return (
    <div id='landing-background'>
      <canvas
        id='landing-canvas'
        ref={ref}
        width={width}
        height={height}
        style={{
          transform: `scale(${Math.min(1.5, 1 + Math.pow(scroll / 600.0, 2))})`
        }}
      >
      </canvas>
    </div>
  );
}