import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import './FlyInAnimation.css'

export const FlyInAnimation = ({ children }) => {
  return (
    <ScrollAnimation animateIn="fly-in" animateOnce duration={0.3}>
      {children}
    </ScrollAnimation>
  )
}