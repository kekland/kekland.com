import React from 'react'
import './Card.css'

import { ReactComponent as ChevronForwardOutline } from '../../icons/chevron-forward-outline.svg'

export const Card = ({ title, description, onClick, accentColor, img, children }) => {
  return (
    <div className='card'>
      <div className='card-title' style={{ color: accentColor }}>
        <span className='text-title' style={{ fontSize: 20 }}>{title}</span>
        <ChevronForwardOutline width={16} />
      </div>
      <span style={{ fontSize: 14 }}>{description}</span>
    </div >
  )
}