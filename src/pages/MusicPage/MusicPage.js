import React, { useEffect } from 'react'
import { Anchor, AnchorLastFm } from '../../components/Anchor/Anchor'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import { Page } from '../../components/Page/Page'
import { useGetLastPlayedQuery } from '../../redux/api'
import { getRelativeTime } from '../MainPage/LastPlayedSection/LastPlayedSection'
import './MusicPage.css'

import { ReactComponent as LastFmLogo } from '../../icons/logo-last-fm.svg'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'

export const MusicPage = () => {
  const { data, refetch } = useGetLastPlayedQuery()

  useEffect(() => {
    const id = setInterval(refetch, 60 * 1000)
    return () => clearInterval(id)
  }, [])

  let child
  if (data) {
    let playedAt
    if (data.playedAt !== null) {
      playedAt = Date.parse(data.playedAt)
    }

    child = (
      <div className='music-page'>
        <div className='music-page-background'
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        />
        <Anchor href={data.url} className='music-page-content'>
          <FlyInAnimation>
            <div className='music-page-image'
              style={{ backgroundImage: `url(${data.imageUrl})` }}
            />
          </FlyInAnimation>
          <div style={{ height: 24 }} />
          <FlyInAnimation delay={50}>
            <div className='text-title' style={{ fontSize: 24 }}>
              {data.track}
            </div>
          </FlyInAnimation>
          <FlyInAnimation delay={100}>
            <div style={{ opacity: 0.5 }}>
              {data.artist}
            </div>
          </FlyInAnimation>
          <div style={{ height: 12 }} />
          <FlyInAnimation delay={150}>
            {
              playedAt ? (
                <div style={{ fontSize: 12, opacity: 0.5 }}>
                  listened {getRelativeTime(playedAt)}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: 'var(--color-primary)' }}>
                  listening now
                </div>
              )
            }
          </FlyInAnimation>
        </Anchor>
        <div className='music-page-actions'>
          <AnchorLastFm>
            <LastFmLogo className='icon' />
          </AnchorLastFm>
        </div>
      </div>
    )
  }
  else {
    child = <></>
  }

  return (
    <Page title={'My music'}>
      <div className='page App-dark'>
        <ModalNavbar title='' parent='/' backgroundColor='transparent' />
        {child}
      </div>
    </Page>
  )
}