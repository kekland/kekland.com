import React from 'react'
import './Button.css'

export const Button = ({ children }) => {
  return (
    <button className='button'>
      {children}
    </button>
  )
}