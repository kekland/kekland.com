import React, { useRef } from 'react'
import { Footer } from '../../components/Footer/Footer'
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
  const size = useWindowSize()
  const isSmall = size.width < 1000

  const aboutMeRef = useRef()
  const portfolioRef = useRef()
  const contactsRef = useRef()

  return (
    <Page title={'My portfolio'}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Background withArrows={!isSmall} animate />
        <Navbar refs={[aboutMeRef, portfolioRef, contactsRef]} />
        <Footer />
        {
          isSmall ? <LandingSectionMobile /> : <LandingSection />
        }
        <AboutMeSection titleRef={aboutMeRef} />
        <MyAppsSection titleRef={portfolioRef} />
        <MyReposSection />
        <GallerySection />
        <ContactMeSection titleRef={contactsRef} />
        <FooterSection />
      </div>
    </Page>
  )
}