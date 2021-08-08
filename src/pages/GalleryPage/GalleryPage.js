import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadPhotos } from '../../api/api'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import { Page } from '../../components/Page/Page'
import { useWindowSize } from '../../hooks/useWindowSize'
import { FooterSection } from '../MainPage/FooterSection/FooterSection'
import './GalleryPage.css'

const GalleryItem = ({ id, url }) => {
  return (
    <FlyInAnimation>
      <div className='gallery-page-item'>
        <div className='gallery-page-item-child'>
          {
            id ?
              <Link to={`/photo/${id}`}>
                <img src={url} className='gallery-page-img' />
              </Link> :
              <div className='gallery-page-img' style={{ backgroundColor: '#bdbdbd' }} />
          }
        </div>
      </div>
    </FlyInAnimation>
  )
}

export const GalleryPage = () => {
  const { width } = useWindowSize()
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  const handleScroll = () => {
    if (!canFetch) return

    if (Math.ceil(window.innerHeight + document.documentElement.scrollTop) < document.documentElement.offsetHeight ||
      isFetching) {
      return;
    }

    setIsFetching(true);
  };

  const fetchData = async () => {
    const newPhotos = await loadPhotos(listItems.length)

    if (newPhotos.length === 0) {
      setCanFetch(false);
      return;
    }

    setListItems([...listItems, ...newPhotos])
    handleScroll()
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    fetchData();
    setIsFetching(false);
  };

  const itemsPerRow = width <= 500 ? 2 : 3

  return (
    <Page title={'My gallery'}>
      <div className='page'>
        <ModalNavbar title='Gallery' parent='/' useScrollEffects />
        <div style={{ height: 240 }} />
        <div className='column' style={{ padding: 24 }}>
          <div className='content-width'>
            <GalleryGrid style={{ marginTop: 40 }}>
              {listItems.map((v, i) => (
                <GalleryItem
                  url={v.thumbnailUrl}
                  id={v.id}
                  key={v.id}
                  row={Math.floor(i / itemsPerRow)}
                />
              ))}
            </GalleryGrid>
          </div>
        </div>
        <FooterSection />
      </div>
    </Page>
  );
}

export const GalleryGrid = ({ style, children, className }) => {
  return (
    <div className={`gallery-page-grid ${className}`} style={{ ...style }}>
      {children}
    </div>
  )
}

export const GalleryGridFromUrlList = ({ style, urls, className }) => {
  const { width } = useWindowSize()
  const itemsPerRow = width <= 500 ? 2 : 3

  return (
    <GalleryGrid style={style} className={className}>
      {
        urls.map((v, i) => {
          const components = v.split('/')
          return (
            <GalleryItem
              url={v}
              id={`uploads_${components[components.length - 1]}`}
              key={i}
              row={Math.floor(i / itemsPerRow)}
            />
          )
        })
      }
    </GalleryGrid>
  )
}
