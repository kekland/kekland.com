import React from 'react'
import './FooterPage.css'

import { ReactComponent as IconCodeSlash } from '../../icons/code-slash.svg'

export const FooterPage = () => {
  return (
    <div className='footer-section'>
      <span style={{ opacity: 0.5 }}>Built with &lt;3 by <b>kekland</b></span>
      <div style={{width: 16}} />
      <IconCodeSlash className='footer-source' />
    </div>
  )
}