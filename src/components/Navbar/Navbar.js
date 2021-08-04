import React from 'react';
import { useWindowScroll } from '../../hooks/useWindowScroll';
import { useWindowSize } from '../../hooks/useWindowSize';
import './Navbar.css';

export const Navbar = ({ refs }) => {
  const scroll = useWindowScroll()
  const windowSize = useWindowSize()

  const items = {
    'about me': 'about-me',
    'portfolio': 'my-apps',
    'contacts': 'contact-me',
  };

  let selected = 'about-me'

  for (const ref of refs) {
    if (ref.current && scroll + windowSize.height > ref.current.offsetTop) {
      selected = ref.current.id
    }
  }

  const isLandingVisible = scroll < windowSize.height

  return (
    <div id='navbar' className='text-title unselectable' style={{ backgroundColor: isLandingVisible ? 'transparent' : 'var(--color-background)' }}>
      <div style={{ flex: 1 }} />
      {
        Object.keys(items).map((item) =>
          <a className={`navbar-item ${items[item] === selected ? 'navbar-selected' : ''}`} href={`#${items[item]}`}>
            {item}
          </a>
        )
      }
    </div>
  );
}