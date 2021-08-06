import React from 'react'
import './GallerySection.css'

import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import { Link } from 'react-router-dom'

import { ReactComponent as ChevronRightIcon } from '../../../icons/chevron-forward-outline.svg'
import { useGetLatestPhotosQuery } from '../../../redux/api'

const GalleryItem = ({ data }) => {
  return (
    <FlyInAnimation>
      <div className='gallery-item'>
        {
          data ?
            <Link to={`/photo/${data.id}`}>
              <img src={data.thumbnailUrl} className='gallery-img' />
            </Link> :
            <div className='gallery-img' style={{ backgroundColor: '#ececec' }} />
        }
      </div>
    </FlyInAnimation>
  )
}

export const GallerySection = ({ titleRef }) => {
  const { data } = useGetLatestPhotosQuery(5)

  let children

  if (data) {
    children = data.map((photo) => <GalleryItem data={photo} key={photo.id} />)
  }
  else {
    children = Array.apply(null, { length: 5 }).map((_, i) => <GalleryItem key={i} />)
  }

  return (
    <div id='my-gallery' className='section' ref={titleRef}>
      <FlyInAnimation>
        <Link to='/gallery'>
          <p className='text-title text-primary' style={{ display: 'flex', alignItems: 'baseline' }}>
            my latest photos
            <ChevronRightIcon style={{ width: 24, height: 24, marginLeft: 12 }} />
          </p>
        </Link>
      </FlyInAnimation>
      <div className='gallery-grid'>
        {children}
      </div>
    </div>
  )
}