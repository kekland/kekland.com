import React from 'react'
import './Footer.css'

import { ReactComponent as LogoGithub } from '../../icons/logo-github.svg';
import { ReactComponent as LogoLinkedIn } from '../../icons/logo-linkedin.svg';
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
        <LogoLinkedIn className='social-button icon' />
      </a>
      <div style={{ width: 16 }} />
      <a target="_blank" href='https://github.com/kekland'>
        <LogoGithub className='social-button icon' />
      </a>
    </div>
  );
}