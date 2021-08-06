import React from 'react'
import './Button.css'

export const Button = ({ children, style }) => {
  return (
    <button className='button' style={style}>
      {children}
    </button>
  )
}