import React from 'react'
import './Footer.css'

import LogoGithub from '../../icons/logo-github.svg';
import LogoLinkedIn from '../../icons/logo-linkedin.svg';
import { useWindowScroll } from '../../hooks/useWindowScroll';

export const Footer = () => {
  const scroll = useWindowScroll();

  const isVisible = scroll < 120.0;

  return (
    <div className='footer' style={{
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? 1 : 0,
    }}>
      <a target="_blank" href='https://linkedin.com/in/kekland'>
        <img className='social-button' src={LogoLinkedIn} />
      </a>
      <div style={{ width: 16 }} />
      <a target="_blank" href='https://github.com/kekland'>
        <img className='social-button' src={LogoGithub} />
      </a>
    </div>
  );
}