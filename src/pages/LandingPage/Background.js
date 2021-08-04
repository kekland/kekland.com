import React, { useState } from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';

import './Background.css';

import { ReactComponent as LandingArrow } from '../../icons/landing-arrow.svg';

// Returns `0` if `t < 1`, returns `t` if `0 < t < 1`, returns `1` if `t > 1`.
const clampNormalized = (t) => (t > 1) ? 1 : (t < 0) ? 0 : t;

export const Background = ({animate}) => {
  const windowSize = useWindowSize();

  const width = windowSize.width;
  const height = windowSize.height;

  const size = Math.min(width, height * 2);

  const scrollExtent = 0.0 //clampNormalized(scroll / 240.0)

  return (
    <>
      <div id='circle' className={animate ? 'circle-animation' : ''} style={{
        width: size,
        height: size,
        left: -size / 2,
        top: (-size / 2),
      }} />
      <LandingArrow class='landing-arrow' style={{
        position: 'absolute',
        left: width / 2,
        top: 160.0,
        bottom: 0,
        height: (size / 2.5),
        opacity: 1.0 - scrollExtent,
      }} />
    </>
  );
}