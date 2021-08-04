import './css/index.css';
import './css/fonts.css';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { Navbar } from './components/Navbar/Navbar';
import { MyAppsPage } from './pages/MyAppsPage/MyAppsPage';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Footer />
      <LandingPage />
      <MyAppsPage />
      <div style={{height: '200vh'}} />
    </div>
  );
}

export default App;
