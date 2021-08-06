import React from 'react'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import './ContactMeSection.css'

import { ReactComponent as LogoGithub } from '../../../icons/logo-github.svg'
import { ReactComponent as LogoLinkedIn } from '../../../icons/logo-linkedin.svg'
import { ReactComponent as IconMail } from '../../../icons/mail.svg'
import { ReactComponent as IconDownload } from '../../../icons/cloud-download-outline.svg'
import { Button } from '../../../components/Button/Button'
import { endpoint } from '../../../api/api'
import { Anchor, AnchorEmail, AnchorGithub, AnchorLinkedIn } from '../../../components/Anchor/Anchor'
import { useGetContentQuery } from '../../../redux/api'

export const ContactMeSection = ({ titleRef }) => {
  const { data } = useGetContentQuery()

  return (
    <div className='section' id='contact-me' ref={titleRef}>
      <FlyInAnimation>
        <p className='text-title text-primary'>contact me</p>
      </FlyInAnimation>
      <FlyInAnimation>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <AnchorEmail><IconMail className='contact-icon icon' /></AnchorEmail>
          <AnchorGithub><LogoGithub className='contact-icon icon' /></AnchorGithub>
          <AnchorLinkedIn><LogoLinkedIn className='contact-icon icon' /></AnchorLinkedIn>
          <div style={{ width: 100, opacity: 0.5, textAlign: 'center' }} className='text-title'>or</div>
          <Anchor href={`${endpoint}${data?.resumeUrl}`}>
            <Button style={{ width: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconDownload style={{ width: 20 }} />
              <div style={{ width: 8 }} />
              <span>Resume</span>
            </Button>
          </Anchor>
        </div>
      </FlyInAnimation>
    </div>
  )
}