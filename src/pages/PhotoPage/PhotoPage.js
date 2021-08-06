import React, { useState } from 'react'
import { useParams } from 'react-router'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import { useGetSinglePhotoAutoQuery } from '../../redux/api'
import './PhotoPage.css'

export const PhotoPage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { id } = useParams()
  const { data } = useGetSinglePhotoAutoQuery(id)

  let child
  let thumbnailChild

  if (data) {
    child = <img src={data.url} className='photo-page-photo' onLoad={() => setIsLoaded(true)} />

    if (data.url.includes('=w') && !isLoaded) {
      const thumbnailUrl = `${data.url.split('=w')[0]}=w500`
      thumbnailChild = <img src={thumbnailUrl} className='photo-page-photo-thumbnail' />
    }
  }

  return (
    <div className='page photo-page'>
      <div className='photo-page-navbar'>
        <ModalNavbar backgroundColor='transparent' preferredBackLocation='/gallery' />
      </div>
      {thumbnailChild}
      {child}
    </div>
  )
}