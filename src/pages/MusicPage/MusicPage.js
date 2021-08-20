import React, { useEffect, useRef, useState } from 'react'
import { Anchor, AnchorLastFm } from '../../components/Anchor/Anchor'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import { Page } from '../../components/Page/Page'
import { useGetScrobblesQuery } from '../../redux/api'
import { getRelativeTime } from '../MainPage/LastPlayedSection/LastPlayedSection'
import './MusicPage.css'

import { ReactComponent as LastFmLogo } from '../../icons/logo-last-fm.svg'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'
import { useWindowSize } from '../../hooks/useWindowSize'

// const clamp = (n, min, max) => n > max ? max : (n < min) ? min : n

const MusicItem = ({ data, opacity, delay }) => {
  let listenedAt
  if (data.listenedAt !== null) {
    listenedAt = Date.parse(data.listenedAt)
  }

  return (
    <Anchor href={data.url}
      className={`music-page-item`}
      style={{
        opacity,
        transform: `scale(${opacity})`,
      }}>
      <FlyInAnimation delay={delay}>
        <div className='music-page-image'
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        />
      </FlyInAnimation>
      <div style={{ height: 24 }} />
      <FlyInAnimation delay={50 + delay}>
        <div className='text-title' style={{ fontSize: 24 }}>
          {data.track}
        </div>
      </FlyInAnimation>
      <FlyInAnimation delay={100 + delay}>
        <div style={{ opacity: 0.5 }}>
          {data.artist}
        </div>
      </FlyInAnimation>
      <div style={{ height: 12 }} />
      <FlyInAnimation delay={150 + delay}>
        {
          listenedAt ? (
            <div style={{ fontSize: 12, opacity: 0.5 }}>
              listened {getRelativeTime(listenedAt)}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: 'var(--color-primary)' }}>
              listening now
            </div>
          )
        }
      </FlyInAnimation>
    </Anchor>
  )
}

export const MusicPage = () => {
  const scrollRef = useRef()
  const [scroll, setScroll] = useState(0)
  const { width } = useWindowSize()
  const { data: scrobbles, refetch } = useGetScrobblesQuery()

  useEffect(() => {
    const id = setInterval(refetch, 60 * 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (!scrollRef.current) return
    scrollRef.current.scrollLeft = scrollRef.current.scrollWidth
  }, [scrobbles])

  useEffect(() => {
    const handleScroll = () => {
      setScroll(scrollRef.current.scrollLeft)
    }

    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll)
  }, [])

  let children = []
  if (scrobbles) {
    children = scrobbles.map((v, i) => {
      const position = i * 240
      const diff = Math.abs(scroll - position)

      const isInView = (1.0 - (diff / 100.0)) > 0.1
      return (
        <MusicItem
          key={v.id}
          data={v}
          opacity={isInView ? 1 : 0.8}
          delay={(scrobbles.length - i - 1) * 100}
        />
      )
    })
  }

  return (
    <Page title={'My music'}>
      <div className='page App-dark'>
        <ModalNavbar title='' parent='/' backgroundColor='transparent' />
        <div className='music-page'>
          {
            scrobbles ?
              <div className='music-page-background' style={{ backgroundImage: `url(${scrobbles[scrobbles.length - 1].imageUrl})` }} />
              : null
          }

          <div className='music-page-scrollable' ref={scrollRef}>
            <div>
              <div style={{ width: width / 2 - 120 }} />
              {children}
              <div style={{ width: width / 2 - 120 }} />
            </div>
          </div>
          <div className='music-page-actions'>
            <AnchorLastFm>
              <LastFmLogo className='icon' />
            </AnchorLastFm>
          </div>
        </div>
      </div>
    </Page>
  )
}