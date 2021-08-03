import './css/index.css';
import './css/fonts.css';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { Navbar } from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default App;
