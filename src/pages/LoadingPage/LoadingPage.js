import React from 'react'
import './LoadingPage.css'

export const LoadingPage = () => {
  return (
    <div className='loading-page'>
      <div className='spinner spinner-primary' />
      <div className='spinner spinner-secondary' />
    </div>
  )
}