import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadPhotos } from '../../api/api'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import { FooterSection } from '../MainPage/FooterSection/FooterSection'
import './GalleryPage.css'

const GalleryItem = ({ id, url }) => {
  return (
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
  )
}

export const GalleryPage = () => {
  const [listItems, setListItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
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

  return (
    <div className='page'>
      <ModalNavbar title='Gallery' parent='/' useScrollEffects />
      <div style={{ height: 240 }} />
      <div className='column' style={{ padding: 24 }}>
        <div className='content-width'>
          <GalleryGrid style={{ marginTop: 40 }}>
            {listItems.map((v) => (
              <GalleryItem url={v.thumbnailUrl} id={v.id} key={v.id} />
            ))}
          </GalleryGrid>
        </div>
      </div>
      <FooterSection />
    </div>
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

  return (
    <GalleryGrid style={style} className={className}>
      {
        urls.map((v, i) => {
          const components = v.split('/')
          return (
            <GalleryItem url={v} id={`uploads_${components[components.length - 1]}`} key={i} />
          )
        })
      }
    </GalleryGrid>
  )
}
