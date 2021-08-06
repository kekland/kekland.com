import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import './Navbar.css';

import { ReactComponent as ArrowBackIcon } from '../../icons/chevron-back-outline.svg'
import { Link, useHistory } from 'react-router-dom';
import { useWindowScroll } from '../../hooks/useWindowScroll';

export const Navbar = ({ refs }) => {
  const scroll = useWindowScroll();
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

  const isTransparent = scroll < windowSize.height

  return (
    <div className='navbar text-title unselectable' style={{ backgroundColor: isTransparent ? 'transparent' : 'var(--color-background)' }}>
      <div style={{ flex: 1 }} />
      {
        Object.keys(items).map((item) =>
          <a
            key={item}
            className={`navbar-item ${items[item] === selected ? 'navbar-selected' : ''}`}
            href={`#${items[item]}`}>
            {item}
          </a>
        )
      }
    </div>
  );
}

export const ModalNavbar = ({ title, preferredBackLocation, parent, backgroundColor, useScrollEffects }) => {
  const history = useHistory()
  const { width } = useWindowSize()

  const scroll = useWindowScroll();
  const scrollEffectHeight = 240;
  const scrollEffect = useScrollEffects ? Math.max(1.0 - scroll / scrollEffectHeight, 0.0) : 0.0

  const marginLeft = width - 1024 >= 40 ? 0 : Math.max(40, width - 1024)

  const goBack = () => {
    if (history.action === 'POP' || history.action === 'REPLACE') {
      history.replace(preferredBackLocation ?? '/')
    }
    else {
      history.goBack()
    }
  }

  return (
    <div className='navbar text-title unselectable' style={{
      backgroundColor: backgroundColor ?? 'var(--color-background)',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ position: 'absolute', left: 16, height: 24, cursor: 'pointer' }} onClick={goBack}>
        <ArrowBackIcon style={{ width: 24 }} />
      </div>
      <div className='content-width' style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        <span style={{
          position: 'absolute',
          marginLeft: marginLeft * (1.0 - scrollEffect),
          transform: `scale(${scrollEffect * 2.0 + 1.0}) translateY(${scrollEffect * 60}px)`,
          transformOrigin: 'top left',
        }}>
          {title}
        </span>
      </div>
    </div>
  )
}