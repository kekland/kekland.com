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

function App() {
  return (
    <div className="App">
      <Navbar />
      <Footer />
      <LandingPage />
      <AboutMePage />
      <MyAppsPage />
      <MyReposPage />
      <ContactMePage />
      <FooterPage />
    </div>
  );
}

export default App;
