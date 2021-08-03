import React from 'react';
import { Background } from './Background';
import './LandingPage.css';

import LogoGithub from '../../icons/logo-github.svg';
import LogoLinkedIn from '../../icons/logo-linkedin.svg';
import { SwitchingText } from './SwitchingText';

export const LandingPage = () => {
  return (
    <div id='landing-page'>
      <Background />
      <div id='title'>
        <span className='text-title unselectable' style={{ fontSize: '56px' }}>
          hello
          <span style={{ color: 'var(--color-primary)' }}>.</span>
        </span>
        <span className='text-title unselectable' style={{ fontSize: '80px' }}>
          I'm&nbsp;
          <span style={{ color: 'var(--color-primary)' }}>Erzhan</span>
        </span>
        <span style={{ fontSize: '16px', opacity: 0.5, alignSelf: 'flex-end' }}>
          &gt; a&nbsp;
          <span style={{ fontWeight: 500 }}>
            <SwitchingText labels={[
              'software engineer',
              'designer',
              'robotics enthusiast',
              'photographer',
            ]} />
          </span>
        </span>
      </div>
      <div id='socials'>
        <img className='social-button' src={LogoLinkedIn} />
        <div style={{ width: 16 }} />
        <img className='social-button' src={LogoGithub} />
      </div>
    </div>
  );
}