import React, { useState } from 'react';
import { Background } from './Background';
import { useWindowScroll } from '../../hooks/useWindowScroll';

import './LandingPage.css';

import { SwitchingText } from './SwitchingText';

export const LandingPage = () => {
  const [animated, setAnimated] = useState(false)
  const scroll = useWindowScroll()

  if (scroll > 0 && !animated) {
    setAnimated(true)
  }

  const animatedTextClassName = `text-name ${animated ? 'text-name-animation' : ''}`;
  return (
    <div id='landing-page'>
      <Background animate={animated} />
      <div id='title'>
        <span className='text-title unselectable' style={{ fontSize: '56px' }}>
          hello
          <span className={animatedTextClassName}>.</span>
        </span>
        <span className='text-title unselectable' style={{ fontSize: '80px' }}>
          I'm&nbsp;
          <span className={animatedTextClassName}>Erzhan</span>
        </span>
        <span style={{ fontSize: '16px', opacity: 0.5, alignSelf: 'flex-end' }}>
          &gt; a&nbsp;
          <b>
            <SwitchingText labels={[
              'software engineer',
              'designer',
              'robotics enthusiast',
              'photographer',
            ]} />
          </b>
        </span>
      </div>
    </div>
  );
}