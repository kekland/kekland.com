import React from 'react';
import { useWindowSize } from '../../../hooks/useWindowSize';

import './Background.css';

import { ReactComponent as LandingArrow } from '../../../icons/landing-arrow.svg';


export const Background = ({ animate, withArrows }) => {
  const windowSize = useWindowSize();

  const width = windowSize.width;
  const height = windowSize.height;

  const size = Math.min(width, height * 2);

  const circleStyle = {
    width: size,
    height: size,
    left: -size / 2,
    top: (-size / 2),
  }

  return (
    <div id='landing-background'>
      <div id='circle' className={animate ? 'circle-animation' : ''} style={circleStyle} />
      <div className={`outer-circle ${animate ? 'outer-circle-animation' : ''}`} style={circleStyle} />
      {
        withArrows ? <LandingArrow className='landing-arrow' style={{
          position: 'absolute',
          left: width / 2,
          top: 160.0,
          bottom: 0,
          height: (size / 2.5),
          opacity: 1.0,
        }} /> : <></>
      }
    </div>
  );
}