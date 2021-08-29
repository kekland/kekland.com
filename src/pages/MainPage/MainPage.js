import React, { useEffect, useRef, useState } from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import { Page } from '../../components/Page/Page'
import { useWindowSize } from '../../hooks/useWindowSize'
import { AboutMeSection } from './AboutMeSection/AboutMeSection'
import { ContactMeSection } from './ContactMeSection/ContactMeSection'
import { EducationSection } from './EducationSection/EducationSection'
import { ExperienceSection } from './ExperienceSection/ExperienceSection'
import { FooterSection } from './FooterSection/FooterSection'
import { GallerySection } from './GallerySection/GallerySection'
import { Background } from './LandingSection/Background'
import { LandingSection, LandingSectionMobile } from './LandingSection/LandingSection'
import { MyAppsSection } from './MyAppsSection/MyAppsSection'
import { MyReposSection } from './MyReposSection/MyReposSection'
import { TechnologiesSection } from './TechnologiesSection/TechnologiesSection'

export const MainPage = () => {
  const [animate, setAnimate] = useState(true)
  const size = useWindowSize()
  const isSmall = size.width < 1000

  const aboutMeRef = useRef()
  const portfolioRef = useRef()
  const contactsRef = useRef()

  useEffect(() => {
    if (window.pageYOffset !== 0) {
      setAnimate(false)
    }
  }, [])

  return (
    <Page title={'Erzhan\'s portfolio'}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Background skipAnimation={!animate} />
        <Navbar refs={[aboutMeRef, portfolioRef, contactsRef]} />
        {
          isSmall ?
            <LandingSectionMobile animate={animate} /> :
            <LandingSection animate={animate} />
        }
        <AboutMeSection titleRef={aboutMeRef} />
        <div style={{ height: 32 }} />
        <MyAppsSection titleRef={portfolioRef} />
        <div style={{ height: 32 }} />
        <MyReposSection />
        <div style={{ height: 32 }} />
        <TechnologiesSection />
        <div style={{ height: 32 }} />
        <ExperienceSection />
        <div style={{ height: 32 }} />
        <EducationSection />
        <div style={{ height: 32 }} />
        <GallerySection />
        {
          // <div style={{height: 32}} />
          // <LastPlayedSection />
        }
        <div style={{ height: 32 }} />
        <ContactMeSection titleRef={contactsRef} />
        <div style={{ height: 32 }} />
        <FooterSection />
      </div>
    </Page>
  )
}

export default MainPage;
