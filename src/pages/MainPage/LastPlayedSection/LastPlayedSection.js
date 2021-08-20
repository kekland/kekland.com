import React, { useEffect } from 'react'
import { useGetLastPlayedQuery } from '../../../redux/api'
import './LastPlayedSection.css'

import { ReactComponent as ChevronRightIcon } from '../../../icons/chevron-forward-outline.svg'
import { Anchor } from '../../../components/Anchor/Anchor'

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

const getRelativeTime = (d1, d2 = new Date()) => {
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
    const id = setTimeout(refetch, 60 * 1000)
    return () => clearTimeout(id)
  }, [data])

  if (!data) return <></>

  let playedAt
  if (data.playedAt !== null) {
    playedAt = Date.parse(data.playedAt)
  }

  return (
    <Anchor href={data.url} className='section last-played-section'>
      <div className='last-played-section-background' style={{
        backgroundImage: `url(${data.imageUrl})`,
      }} />
      <div className='last-played-image' style={{
        background: `url(${data.imageUrl})`,
      }} />
      <div style={{ width: 32 }} />
      <div className='last-played-title'>
        {
          !playedAt ? (
            <div style={{ fontSize: 12, color: 'var(--color-primary)' }}>
              listening now
            </div>
          ) : null
        }
        <div className='text-title' style={{ fontSize: 24 }}>
          {data.track}
        </div>
        <div style={{ opacity: 0.5 }}>
          {data.artist} — {data.albumName}
        </div>
        {
          playedAt ? (
            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 8 }}>
              listened {getRelativeTime(playedAt)}
            </div>
          ) : null
        }
      </div>
      <div style={{ width: 32 }} />
      <ChevronRightIcon style={{ width: 32 }} />
    </Anchor>
  )
}