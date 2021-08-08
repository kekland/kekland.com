import React from 'react';
import './LandingSection.css';

import { SwitchingText } from './SwitchingText';
import { Footer } from '../../../components/Footer/Footer'

export const LandingSection = ({ animate }) => {
  const animatedTextClassName = `text-name ${animate ? 'text-name-animation' : ''}`;

  return (
    <div id='landing'>
      <Footer />
      <div id='title'>
        <span className='text-title unselectable' style={{ fontSize: '56px' }}>
          hello
          <span className={animatedTextClassName}>.</span>
        </span>
        <span className='text-title unselectable' style={{ fontSize: '80px' }}>
          I&apos;m&nbsp;
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

export const LandingSectionMobile = ({ animate }) => {
  const animatedTextClassName = `text-name ${animate ? 'text-name-animation' : ''}`;

  return (
    <div id='landing'>
      <Footer />
      <div id='title'>
        <span className='text-title unselectable' style={{ fontSize: '36px' }}>
          hello
          <span className={animatedTextClassName}>.</span>
        </span>
        <span className='text-title unselectable' style={{ fontSize: '64px' }}>
          I&apos;m&nbsp;
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