import React from 'react';
import { useWindowScroll } from '../../hooks/useWindowScroll';
import { useWindowSize } from '../../hooks/useWindowSize';
import './Navbar.css';

export const Navbar = () => {
  const scroll = useWindowScroll()
  const windowSize = useWindowSize()

  const items = [
    'about me',
    'portfolio',
    'contacts',
  ];

  const selected = 0

  const isLandingVisible = scroll < windowSize.height

  return (
    <div id='navbar' className='text-title unselectable' style={{ backgroundColor: isLandingVisible ? 'transparent' : 'var(--color-background)' }}>
      <span className='navbar-title' style={{ opacity: isLandingVisible ? 0 : 1 }}>
        Erzhan
      </span>
      <div style={{ flexGrow: '1' }} />

      {
        items.map((item, i) =>
          <label className={`navbar-item ${i === selected ? 'navbar-selected' : ''}`}>
            {item}
          </label>
        )
      }
    </div>
  );
}