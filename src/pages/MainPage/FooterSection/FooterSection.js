import React from 'react'
import './FooterSection.css'

import { ReactComponent as IconCodeSlash } from '../../../icons/code-slash.svg'
import { ReactComponent as IconMoon } from '../../../icons/moon.svg'
import { useDispatch } from 'react-redux'
import { toggle } from '../../../redux/theme.slice'

export const FooterSection = () => {
  const dispatch = useDispatch()

  const toggleTheme = () => {
    dispatch(toggle())
  }

  return (
    <div className='footer-section'>
      <span style={{ opacity: 0.5 }}>Built with &lt;3 by <b>kekland</b></span>
      <div style={{ width: 16 }} />
      <a href="https://github.com/kekland/kekland.com" target="_blank">
        <IconCodeSlash className='footer-source icon' />
      </a>
      <IconMoon className='footer-moon icon' onClick={toggleTheme} />
    </div>
  )
}