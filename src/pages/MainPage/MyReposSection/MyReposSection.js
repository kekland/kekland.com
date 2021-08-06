import React from 'react'
import './MyReposSection.css'

import { Card, ShimmerCard } from '../../../components/Card/Card'
import { ReactComponent as StarIcon } from '../../../icons/star-outline.svg'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import { useSelector } from 'react-redux'
import { Anchor } from '../../../components/Anchor/Anchor'
import { useGetReposQuery } from '../../../redux/api'

const RepoCard = ({ data }) => {
  const theme = useSelector((state) => state.theme.value)

  return (
    <FlyInAnimation>
      <Anchor href={data.url}>
        <Card title={data.name} description={data.description}>
          <div style={{ height: 8 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              filter: theme == 'light' ? 'contrast(90%) brightness(85%)' : '',
            }}>
              <div style={{ width: 12, height: 12, backgroundColor: data.color, borderRadius: 6 }} />
              <div style={{ width: 6 }} />
              <span style={{ color: data.color, fontSize: 12 }}>{data.language}</span>
            </div>
            <div style={{ width: 24 }} />
            <StarIcon style={{ width: 14, opacity: 0.5 }} />
            <div style={{ width: 6 }} />
            <span style={{ opacity: 0.5, fontSize: 12 }}>{data.stars}</span>
          </div>
        </Card>
      </Anchor>
    </FlyInAnimation>
  )
}

export const MyReposSection = () => {
  const { data } = useGetReposQuery()

  const itemCount = 8
  let children

  if (data) {
    const sortedRepos = [...data].sort((a, b) => b.stars - a.stars).slice(0, itemCount)
    children = sortedRepos.map((v) => <RepoCard data={v} key={v.id} />)
  }
  else {
    children = Array.apply(null, { length: itemCount }).map((_, i) =>
      <ShimmerCard bottomItemHeight={30} key={i} />
    );
  }

  return (
    <div className='section'>
      <FlyInAnimation>
        <p className='text-title text-primary'>my repositories</p>
      </FlyInAnimation>
      <div className='repos section-grid'>
        {children}
      </div>
    </div>
  );
}