import React from 'react'

import './css/index.css';
import './css/fonts.css';
import { Route, Switch } from 'react-router-dom';
import ScrollToTop from './hooks/scrollToTop';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import BackgroundImage from './icons/background.svg'
import { LoadingPage } from './pages/LoadingPage/LoadingPage';

// Pages
const AppPage = React.lazy(() => import('./pages/AppPage/AppPage'))
const GalleryPage = React.lazy(() => import('./pages/GalleryPage/GalleryPage'))
const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'))
const MusicPage = React.lazy(() => import('./pages/MusicPage/MusicPage'))
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const PhotoPage = React.lazy(() => import('./pages/PhotoPage/PhotoPage'))

const AppBackground = () => {
  // Disable `maskImage` in Firefox because of performance issues
  const isFirefox = typeof InstallTrigger !== 'undefined';

  return (
    <>
      <div className='App-background' />
      {
        !isFirefox ?
          <div className='App-background-image' style={{
            maskImage: `url(${BackgroundImage})`,
            WebkitMaskImage: `url(${BackgroundImage})`,
          }} /> : null
      }
    </>
  )
}

function App() {
  const theme = useSelector((state) => state.theme.value)

  useEffect(() => {
    // eslint-disable-next-line no-undef
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
      <AppBackground />
      <React.Suspense fallback={LoadingPage}>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/app/:id' component={AppPage} />
          <Route exact path='/gallery' component={GalleryPage} />
          <Route exact path='/music' component={MusicPage} />
          <Route path='/photo/:id' component={PhotoPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </React.Suspense>
    </div>
  );
}

export default App;
