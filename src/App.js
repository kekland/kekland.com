import './css/index.css';
import './css/fonts.css';
import { Route, Switch } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { AppPage } from './pages/AppPage/AppPage';
import ScrollToTop from './hooks/scrollToTop';
import { PhotoPage } from './pages/PhotoPage/PhotoPage';
import { GalleryPage } from './pages/GalleryPage/GalleryPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const theme = useSelector((state) => state.theme.value)

  useEffect(() => {
    setImmediate(() => {
      const color = getComputedStyle(document.querySelector('.App'))
        .getPropertyValue('--color-background')

      // Set background color of `html` item
      document.querySelector('html').style.backgroundColor = color
      localStorage.setItem('theme', theme)
    })
  }, [theme])

  return (
    <div className={`App App-${theme}`}>
      <ScrollToTop />
      <div className='App-background' />
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
