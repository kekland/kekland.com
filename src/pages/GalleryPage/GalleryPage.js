import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getImageMediumUrl, getImageSmallUrl, loadPhotos } from '../../api/api'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import './GalleryPage.css'

const GalleryItem = ({ data }) => {
  console.log(data)
  return (
    <div className='gallery-page-item'>
      <div className='gallery-page-item-child'>
        {
          data ?
            <Link to={`/photo/${data.id}`}>
              <img src={data.thumbnailUrl} className='gallery-page-img' />
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
      <ModalNavbar title='Gallery' parent='/' />
      <div className='column' style={{ padding: 24 }}>
        <div className='content-width gallery-page-grid' style={{ marginTop: 40 }}>
          {listItems.map((v) => (
            <GalleryItem data={v} key={v.id} />
          ))}
        </div>
      </div>
    </div>
  );
}