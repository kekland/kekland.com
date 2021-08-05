import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getImageUrl, loadSinglePhoto } from '../../api/api'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import './PhotoPage.css'

export const PhotoPage = () => {
  const { id } = useParams()
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    loadSinglePhoto(id).then(setPhoto)
  }, []);

  return (
    <div className='photo-page'>
      <div className='photo-page-navbar'>
        <ModalNavbar backgroundColor='transparent' />
      </div>
      {
        photo ? <img src={getImageUrl(photo.image)} className='photo-page-photo' /> : <></>
      }

    </div>
  )
}