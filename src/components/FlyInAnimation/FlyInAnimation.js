import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll'
import './FlyInAnimation.css'

export const FlyInAnimation = ({ children, delay }) => {
  return (
    <ScrollAnimation
      animateIn="fly-in"
      animateOnce
      duration={0.3}
      offset={50}
      delay={delay}>
      {children}
    </ScrollAnimation>
  )
}