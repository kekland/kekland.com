import React from 'react';
import './LandingSection.css';

import { SwitchingText } from './SwitchingText';
import { Footer } from '../../../components/Footer/Footer'

export const LandingSection = ({ animate }) => {
  const animatedClassName = `text-title unselectable ${animate ? 'landing-animation' : ''}`;

  return (
    <div id='landing'>
      <Footer />
      <div id='title'>
        <span className={animatedClassName} style={{
          fontSize: '56px',
          animationDelay: '0.8s',
        }}>
          hello
          <span className='text-name'>.</span>
        </span>
        <span className={animatedClassName} style={{
          fontSize: '80px',
          animationDelay: '0.9s',
        }}>
          I&apos;m&nbsp;
          <span className='text-name'>Erzhan</span>
        </span>
        <span className={animate ? 'landing-switching-text-animation' : ''}
          style={{
            fontSize: '16px',
            alignSelf: 'flex-end',
            opacity: animate ? 0 : 0.5,
            animationDelay: '1.0s',
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