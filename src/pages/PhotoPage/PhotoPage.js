import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getImageUrl, loadSinglePhoto, loadSinglePhotoByGooglePhotoId } from '../../api/api'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import './PhotoPage.css'

export const PhotoPage = () => {
  const { id } = useParams()
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    if (parseInt(id)) {
      loadSinglePhoto(id).then(setPhoto)
    }
    else {
      if (id.startsWith('http')) {
        setPhoto({ url: id })
      }
      else {
        loadSinglePhotoByGooglePhotoId(id).then(setPhoto)
      }
    }
  }, []);

  return (
    <div className='page photo-page'>
      <div className='photo-page-navbar'>
        <ModalNavbar backgroundColor='transparent' preferredBackLocation='/gallery' />
      </div>
      {
        photo ? <img src={photo.url} className='photo-page-photo' /> : <></>
      }

    </div>
  )
}