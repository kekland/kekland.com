import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { loadSingleApp } from '../../api/api'
import { ModalNavbar } from '../../components/Navbar/Navbar'

export const AppPage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    loadSingleApp(id).then(setData)
  }, [])

  return (
    <div className='page'>
      <ModalNavbar title={data ? `${data.title}` : 'App'} />
    </div>
  )
}