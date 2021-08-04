import React from 'react'
import './MyAppsPage.css'

import { Card } from '../../components/Card/Card'

export const MyAppsPage = () => {
  return (
    <div id='my-apps' className='page'>
      <p className='text-title text-primary'>my apps</p>
      <Card title='Almetro' description='an app for tracking almaty subways' accentColor='#019389'></Card>
    </div>
  )
}