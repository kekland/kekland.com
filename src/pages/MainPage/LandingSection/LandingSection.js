import React from 'react';
import './LandingSection.css';

import { SwitchingText } from './SwitchingText';
import { Footer } from '../../../components/Footer/Footer'

export const LandingSection = ({ animate, fontSizeMultiplier }) => {
  const animatedClassName = `text-title unselectable ${animate ? 'landing-animation' : ''}`;

  return (
    <div id='landing'>
      <Footer />
      <div id='title'>
        <span className={animatedClassName} style={{
          fontSize: 56 * (fontSizeMultiplier ?? 1),
          animationDelay: '0.4s',
        }}>
          hello
          <span className='text-name'>.</span>
        </span>
        <span className={animatedClassName} style={{
          fontSize: 80 * (fontSizeMultiplier ?? 1),
          animationDelay: '0.5s',
        }}>
          I&apos;m&nbsp;
          <span className='text-name'>Erzhan</span>
        </span>
        <span className={animate ? 'landing-switching-text-animation' : ''}
          style={{
            fontSize: '16px',
            alignSelf: 'flex-end',
            opacity: animate ? 0 : 0.5,
            animationDelay: '0.6s',
          }}>
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

export const LandingSectionMobile = ({ animate }) => {
  return (
    <LandingSection animate={animate} fontSizeMultiplier={64 / 80} />
  )
}