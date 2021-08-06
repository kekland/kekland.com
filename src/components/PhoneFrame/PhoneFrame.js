import React from 'react'
import './PhoneFrame.css'
import { ReactComponent as IconCloudDownload } from '../../icons/cloud-download-outline.svg'

export const PhoneFrame = ({ children, width, style, showContents }) => {
  return (
    <div className='phone-container-wrapper' style={{ ...style, width }}>
      <div className='phone-container'>
        <div className='phone-frame' />
        <div className={`phone-contents ${showContents ? 'phone-contents-show' : ''}`}>
          {children}
        </div>
      </div>
    </div>
  )
}