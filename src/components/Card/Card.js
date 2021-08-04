import React from 'react'
import './Card.css'

import { ReactComponent as ChevronForwardOutline } from '../../icons/chevron-forward-outline.svg'

export const Card = ({ title, description, onClick, accentColor, img, children }) => {
  return (
    <div className='card'>
      {
        img ? <img className='card-image' src={img} /> : <></>
      }
      <div style={{ padding: 24, boxSizing: 'border-box' }}>
        <div className='card-title' style={{ color: accentColor }}>
          <span className='text-title' style={{ fontSize: 20 }}>{title}</span>
          <ChevronForwardOutline width={16} />
        </div>
        <div style={{
          fontSize: 14,
          opacity: 0.5,
          lineHeight: 1.25,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          wordWrap: 'break-word',
        }}>
          {description}
        </div>
        {children}
      </div>
    </div>
  )
}

export const ShimmerCard = ({ bottomItemHeight }) => {
  return (
    <div className='card'>
      <div style={{ padding: 24, boxSizing: 'border-box' }}>
        <div className='card-title'>
          <div className='shimmer-item' style={{ height: 20, width: 120 }} />
          <ChevronForwardOutline width={16} />
        </div>
        <div style={{ height: 4 }} />
        <div className='shimmer-item' style={{ height: 16, width: 160 }} />
        {
          (bottomItemHeight) ? <>
            <div style={{ height: 4 }} />
            <div className='shimmer-item' style={{ height: bottomItemHeight - 4, width: 100 }} />
          </> : null
        }
      </div>
    </div>
  )
}