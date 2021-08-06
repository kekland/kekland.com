import React from 'react'
import './Footer.css'

import { ReactComponent as LogoGithub } from '../../icons/logo-github.svg';
import { ReactComponent as LogoLinkedIn } from '../../icons/logo-linkedin.svg';
import { useWindowScroll } from '../../hooks/useWindowScroll';
import { AnchorGithub, AnchorLinkedIn } from '../Anchor/Anchor';

export const Footer = () => {
  const scroll = useWindowScroll();

  const isVisible = scroll < 120.0;

  return (
    <div className='footer' style={{
      visibility: isVisible ? 'visible' : 'hidden',
      opacity: isVisible ? 1 : 0,
    }}>
      <AnchorLinkedIn>
        <LogoLinkedIn className='social-button icon' />
      </AnchorLinkedIn>
      <div style={{ width: 16 }} />
      <AnchorGithub>
        <LogoGithub className='social-button icon' />
      </AnchorGithub>
    </div>
  );
}