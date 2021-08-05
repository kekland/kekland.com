import React from 'react';
import { Background } from './Background';
import { useWindowScrollOnce } from '../../hooks/useWindowScroll';

import './LandingPage.css';

import { SwitchingText } from './SwitchingText';
import { useWindowSize } from '../../hooks/useWindowSize';

export const LandingPage = () => {
  const size = useWindowSize()
  const animated = useWindowScrollOnce()

  if (size.width < 1000) {
    return (
      <LandingPageMobile animated={animated} />
    )
  }

  const animatedTextClassName = `text-name ${animated ? 'text-name-animation' : ''}`;
  return (
    <div id='landing'>
      <Background animate={animated} withArrows />
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

export const LandingPageMobile = ({ animated }) => {
  const animatedTextClassName = `text-name ${animated ? 'text-name-animation' : ''}`;

  return (
    <div id='landing'>
      <Background animate={animated} />
      <div id='title'>
        <span className='text-title unselectable' style={{ fontSize: '36px' }}>
          hello
          <span className={animatedTextClassName}>.</span>
        </span>
        <span className='text-title unselectable' style={{ fontSize: '64px' }}>
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