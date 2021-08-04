import React from 'react'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'
import './ContactMePage.css'

import { ReactComponent as LogoDiscord } from '../../icons/logo-discord.svg'
import { ReactComponent as LogoGithub } from '../../icons/logo-github.svg'
import { ReactComponent as LogoLinkedIn } from '../../icons/logo-linkedin.svg'
import { ReactComponent as IconMail } from '../../icons/mail.svg'

export const ContactMePage = () => {
  return (
    <div className='page'>
      <FlyInAnimation>
        <p className='text-title text-primary'>contact me</p>
      </FlyInAnimation>
      <FlyInAnimation>
        <a target="_blank" href='mailto:kk.erzhan@gmail.com'><IconMail className='contact-icon' /></a>
        <a target="_blank" href='https://github.com/kekland'><LogoGithub className='contact-icon' /></a>
        <a target="_blank" href='https://linkedin.com/in/kekland'><LogoLinkedIn className='contact-icon' /></a>
      </FlyInAnimation>
    </div>
  )
}