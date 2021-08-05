import './css/index.css';
import './css/fonts.css';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { Navbar } from './components/Navbar/Navbar';
import { MyAppsPage } from './pages/MyAppsPage/MyAppsPage';
import { Footer } from './components/Footer/Footer';
import { MyReposPage } from './pages/MyReposPage/MyReposPage';
import { ContactMePage } from './pages/ContactMePage/ContactMePage';
import { FooterPage } from './pages/FooterPage/FooterPage';
import { AboutMePage } from './pages/AboutMePage/AboutMePage';
import { useRef } from 'react';

function App() {
  const aboutMeRef = useRef()
  const portfolioRef = useRef()
  const contactsRef = useRef()

  return (
    <div className="App">
      <Navbar refs={[aboutMeRef, portfolioRef, contactsRef]} />
      <Footer />
      <LandingPage />
      <AboutMePage titleRef={aboutMeRef} />
      <MyAppsPage titleRef={portfolioRef} />
      <MyReposPage />
      <ContactMePage titleRef={contactsRef} />
      <FooterPage />
    </div>
  );
}

export default App;
