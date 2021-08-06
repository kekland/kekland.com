import React from 'react'
import './MyAppsSection.css'

import { Card, ShimmerCard } from '../../../components/Card/Card'
import { getImageUrl } from '../../../api/api'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import { Link } from 'react-router-dom'
import { useGetAppsQuery } from '../../../redux/api'


const AppCard = ({ data }) => {
  return (
    <FlyInAnimation>
      <Link to={`/app/${data.id}`}>
        <Card
          title={data.title}
          description={data.description}
          img={getImageUrl(data.image)}
        />
      </Link>
    </FlyInAnimation>
  )
}

export const MyAppsSection = ({ titleRef }) => {
  const { data } = useGetAppsQuery()

  let children

  if (data) {
    children = data.map((app) => <AppCard data={app} key={app.id} />)
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