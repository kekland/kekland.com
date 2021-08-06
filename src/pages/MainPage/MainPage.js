import React, { useRef } from 'react'
import { Footer } from '../../components/Footer/Footer'
import { Navbar } from '../../components/Navbar/Navbar'
import { AboutMeSection } from './AboutMeSection/AboutMeSection'
import { ContactMeSection } from './ContactMeSection/ContactMeSection'
import { FooterSection } from './FooterSection/FooterSection'
import { GallerySection } from './GallerySection/GallerySection'
import { LandingSection } from './LandingSection/LandingSection'
import { MyAppsSection } from './MyAppsSection/MyAppsSection'
import { MyReposSection } from './MyReposSection/MyReposSection'

export const MainPage = () => {
  const aboutMeRef = useRef()
  const portfolioRef = useRef()
  const contactsRef = useRef()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Navbar refs={[aboutMeRef, portfolioRef, contactsRef]} />
      <Footer />
      <LandingSection />
      <AboutMeSection titleRef={aboutMeRef} />
      <MyAppsSection titleRef={portfolioRef} />
      <MyReposSection />
      <GallerySection />
      <ContactMeSection titleRef={contactsRef} />
      <FooterSection />
    </div>
  )
}