import './css/index.css';
import './css/fonts.css';
import { Route, Switch, useLocation } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AppPage } from './pages/AppPage/AppPage';
import ScrollToTop from './hooks/scrollToTop';
import { PhotoPage } from './pages/PhotoPage/PhotoPage';
import { GalleryPage } from './pages/GalleryPage/GalleryPage';


function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/app/:id' component={AppPage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route path='/photo/:id' component={PhotoPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
