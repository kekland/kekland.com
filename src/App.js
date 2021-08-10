import React from 'react'

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
import BackgroundImage from './icons/background.svg'

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
      <div className='App-background' />
      <div className='App-background-image' style={{
        maskImage: `url(${BackgroundImage})`,
        WebkitMaskImage: `url(${BackgroundImage})`,
      }} />
      <Switch>
        <Route exact path='/'>
          <MainPage />
        </Route>
        <Route path='/app/:id' component={AppPage} />
        <Route exact path='/gallery' component={GalleryPage} />
        <Route path='/photo/:id' component={PhotoPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
