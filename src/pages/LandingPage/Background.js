import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

import './Background.css';

import { ReactComponent as LandingArrow } from '../../icons/landing-arrow.svg';

export const Background = () => {
  const windowSize = useWindowSize();

  const width = windowSize.width;
  const height = windowSize.height;

  const size = Math.min(width, height * 2);


  return (
    <>
      <div id='circle' style={{
        width: size,
        height: size,
        left: -size / 2,
        top: -size / 2,
      }} />
      <LandingArrow class='landing-arrow' style={{
        position: 'absolute',
        left: size / 2.25,
        top: 160,
        bottom: 0,
        height: height - 160,
      }} />
    </>
  );
}