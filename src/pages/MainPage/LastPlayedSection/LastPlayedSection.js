import React, { useEffect } from 'react'
import { useGetLastPlayedQuery } from '../../../redux/api'
import './LastPlayedSection.css'

import { ReactComponent as ChevronRightIcon } from '../../../icons/chevron-forward-outline.svg'
import { Link } from 'react-router-dom'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
const units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: 24 * 60 * 60 * 1000 * 365 / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

export const getRelativeTime = (d1, d2 = new Date()) => {
  const elapsed = d1 - d2

  for (const u in units) {
    if (Math.abs(elapsed) > units[u] || u == 'second') {
      return rtf.format(Math.round(elapsed / units[u]), u)
    }
  }
}

export const LastPlayedSection = () => {
  const { data, refetch } = useGetLastPlayedQuery()

  useEffect(() => {
    const id = setInterval(refetch, 60 * 1000)
    return () => clearInterval(id)
  }, [])

  if (!data) return <></>

  let playedAt
  if (data.playedAt !== null) {
    playedAt = Date.parse(data.playedAt)
  }

  return (
    <Link to='/music' className='section last-played-section'>
      <div className='last-played-section-background' style={{ }} />
      <FlyInAnimation>
        <div className='last-played-image' style={{
          backgroundImage: `url(${data.imageUrl})`,
        }} />
      </FlyInAnimation>
      <div style={{ width: 32 }} />
      <div className='last-played-title'>
        {
          !playedAt ? (
            <FlyInAnimation delay={50}>
              <div style={{ fontSize: 12, color: 'var(--color-primary)' }}>
                listening now
              </div>
            </FlyInAnimation>
          ) : null
        }
        <FlyInAnimation delay={100}>
          <div className='text-title' style={{ fontSize: 24 }}>
            {data.track}
          </div>
        </FlyInAnimation>
        <FlyInAnimation delay={150}>
          <div style={{ opacity: 0.5 }}>
            {data.artist}
          </div>
        </FlyInAnimation>
        {
          playedAt ? (
            <FlyInAnimation delay={200}>
              <div style={{ fontSize: 12, opacity: 0.5, marginTop: 8 }}>
                listened {getRelativeTime(playedAt)}
              </div>
            </FlyInAnimation>
          ) : null
        }
      </div>
      <div style={{ width: 32 }} />
      <ChevronRightIcon style={{ width: 32 }} />
    </Link>
  )
}