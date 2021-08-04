import React, { useState, useEffect } from 'react'
import './MyReposPage.css'

import { loadRepos } from '../../api/api'
import { Card, ShimmerCard } from '../../components/Card/Card'
import { ReactComponent as StarIcon } from '../../icons/star-outline.svg'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'

const RepoCard = ({ data }) => {
  return (
    <FlyInAnimation>
      <a target="_blank" href={data.url}>
        <Card title={data.name} description={data.description}>
          <div style={{ height: 8 }} />
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <div style={{ width: 12, height: 12, backgroundColor: data.color, borderRadius: 6 }} />
            <div style={{ width: 6 }} />
            <span style={{ color: data.color, fontSize: 12 }}>{data.language}</span>
            <div style={{ width: 24 }} />
            <StarIcon style={{ width: 14, opacity: 0.5 }} />
            <div style={{ width: 6 }} />
            <span style={{ opacity: 0.5, fontSize: 12 }}>{data.stars}</span>
          </div>
        </Card>
      </a>
    </FlyInAnimation>
  )
}

export const MyReposPage = () => {
  const [repos, setRepos] = useState(null);

  useEffect(async () => {
    const result = await loadRepos()
    setRepos(result);
  }, []);

  const itemCount = 8
  let children

  if (repos) {
    const sortedRepos = [...repos].sort((a, b) => b.stars - a.stars).slice(0, itemCount)
    children = sortedRepos.map((v) => <RepoCard data={v} />)
  }
  else {
    children = Array.apply(null, { length: itemCount }).map((_) =>
      <ShimmerCard bottomItemHeight={30} />
    );
  }

  return (
    <div className='page'>
      <FlyInAnimation>
        <p className='text-title text-primary'>my repositories</p>
      </FlyInAnimation>
      <div className='repos page-grid'>
        {children}
      </div>
    </div>
  );
}