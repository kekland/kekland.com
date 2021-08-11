import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Page } from '../../components/Page/Page'
import { useWindowSize } from '../../hooks/useWindowSize'
import { AboutMeSection } from './AboutMeSection/AboutMeSection'
import { ContactMeSection } from './ContactMeSection/ContactMeSection'
import { FooterSection } from './FooterSection/FooterSection'
import { GallerySection } from './GallerySection/GallerySection'
import { Background } from './LandingSection/Background'
import { LandingSection, LandingSectionMobile } from './LandingSection/LandingSection'
import { MyAppsSection } from './MyAppsSection/MyAppsSection'
import { MyReposSection } from './MyReposSection/MyReposSection'

export const MainPage = () => {
  const [animate, setAnimate] = useState(false)
  const size = useWindowSize()
  const isSmall = size.width < 1000

  const aboutMeRef = useRef()
  const portfolioRef = useRef()
  const contactsRef = useRef()

  useEffect(() => {
    if (window.pageYOffset === 0) {
      setAnimate(true)
    }
  }, [])

  return (
    <Page title={'My portfolio'}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Background skipAnimation={!animate} />
        <Navbar refs={[aboutMeRef, portfolioRef, contactsRef]} />
        {
          isSmall ?
            <LandingSectionMobile animate={animate} /> :
            <LandingSection animate={animate} />
        }
        <AboutMeSection titleRef={aboutMeRef} />
        <div style={{height: 32}} />
        <MyAppsSection titleRef={portfolioRef} />
        <div style={{height: 32}} />
        <MyReposSection />
        <div style={{height: 32}} />
        <GallerySection />
        <div style={{height: 32}} />
        <ContactMeSection titleRef={contactsRef} />
        <div style={{height: 32}} />
        <FooterSection />
      </div>
    </Page>
  )
}