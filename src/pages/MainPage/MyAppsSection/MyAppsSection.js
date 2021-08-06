import React, { useState, useEffect } from 'react'
import './MyAppsSection.css'

import { Card, ShimmerCard } from '../../../components/Card/Card'
import { loadMyApps, getImageUrl } from '../../../api/api'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import { Link } from 'react-router-dom'


const AppCard = ({ data }) => {
  return (
    <FlyInAnimation>
      <a href={data.url} target='_blank'>
        <Card
          title={data.title}
          description={data.description}
          img={getImageUrl(data.image)}
        />
      </a>
    </FlyInAnimation>
  )
}

export const MyAppsSection = ({titleRef}) => {
  const [apps, setApps] = useState(null);

  useEffect(() => {
    loadMyApps().then(setApps)
  }, []);

  let children

  if (apps) {
    children = apps.map((app) => <AppCard data={app} key={app.id} />)
  }
  else {
    children = Array.apply(null, { length: 2 }).map((_, i) => <ShimmerCard key={i} />)
  }

  return (
    <div id='my-apps' className='section' ref={titleRef}>
      <FlyInAnimation>
        <p className='text-title text-primary'>my apps</p>
      </FlyInAnimation>
      <div className='apps section-grid'>
        {children}
      </div>
    </div>
  )
}