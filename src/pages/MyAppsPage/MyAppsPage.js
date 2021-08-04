import React, { useState, useEffect } from 'react'
import './MyAppsPage.css'

import { Card, ShimmerCard } from '../../components/Card/Card'
import { loadMyApps, getImageUrl } from '../../api/api'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'


const AppCard = ({ data }) => {
  return (
    <FlyInAnimation>
      <a target="_blank" href={data.url}>
        <Card
          title={data.title}
          description={data.description}
          img={getImageUrl(data.image)}
          accentColor={data.color}
        />
      </a>
    </FlyInAnimation>
  )
}

export const MyAppsPage = () => {
  const [apps, setApps] = useState(null);

  useEffect(async () => {
    const result = await loadMyApps()
    setApps(result);
  }, []);

  let children

  if (apps) {
    children = apps.map((app) => <AppCard data={app} />)
  }
  else {
    children = Array.apply(null, { length: 2 }).map((_) => <ShimmerCard />)
  }

  return (
    <div id='my-apps' className='page page-grid'>
      <FlyInAnimation>
        <p className='text-title text-primary'>my apps</p>
      </FlyInAnimation>
      <div className='apps page-grid'>
        {children}
      </div>
    </div>
  )
}