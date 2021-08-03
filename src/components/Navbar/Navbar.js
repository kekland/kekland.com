import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  const items = [
    'about me',
    'portfolio',
    'contacts',
  ];

  const selected = 0

  return (
    <div id='navbar' className='text-title unselectable'>
      {
        items.map((item, i) =>
          <label className={`navbar-item ${i == selected ? 'navbar-selected' : ''}`}>
            {item}
          </label>
        )
      }
    </div>
  );
}