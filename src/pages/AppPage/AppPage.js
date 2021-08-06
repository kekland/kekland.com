import React, { useEffect, useState } from 'react'
import './AppPage.css'

import { useParams } from 'react-router'
import { getImageUrl, loadSingleApp } from '../../api/api'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame'
import ReactMarkdown from 'react-markdown'
import GooglePlayIcon from '../../icons/google-play.png'
import AppStoreIcon from '../../icons/app-store.png'
import { ReactComponent as IconDesktop } from '../../icons/desktop-outline.svg'
import { ReactComponent as IconGithub } from '../../icons/logo-github.svg'
import { ReactComponent as IconExpand } from '../../icons/expand.svg'
import { GalleryGridFromPathList, GalleryGridFromUrlList } from '../GalleryPage/GalleryPage'
import { FooterSection } from '../MainPage/FooterSection/FooterSection'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'
import { useWindowSize } from '../../hooks/useWindowSize'

export const AppPage = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    loadSingleApp(id).then(setData)
  }, [])

  if (!data) {
    return (
      <div className='page app-page'>
        <ModalNavbar title={'App'} useScrollEffects />
        <div style={{ height: '100vh' }} />
      </div>
    )
  }

  return (
    <div className='page app-page'>
      <ModalNavbar
        icon={<img src={getImageUrl(data.icon)} width='20px' height='20px' />}
        title={data.title}
        useScrollEffects
        preferredBackLocation='/'
      />
      <div style={{ height: 280 }} />
      <div className='app-page-content content-width'>
        <div className='app-page-info'>
          <FlyInAnimation>
            <div className='text-title' style={{ opacity: 0.5, fontSize: 24 }}>
              description
            </div>
          </FlyInAnimation>
          <FlyInAnimation delay={100}>
            <ReactMarkdown>
              {data.body}
            </ReactMarkdown>
          </FlyInAnimation>
          <br />
          <FlyInAnimation delay={200}>
            <div style={{ display: 'flex' }}>
              {
                data.iframeUrl ?
                  <a href={data.iframeUrl} target="_blank" style={{ marginRight: 16 }}>
                    <IconDesktop className='icon app-page-icon' />
                  </a> : null
              }
              {
                data.repositoryUrl ?
                  <a href={data.repositoryUrl} target="_blank">
                    <IconGithub className='icon app-page-icon' />
                  </a> : null
              }
            </div>
          </FlyInAnimation>
          <br />
          {
            data.appStoreUrl ?
              <FlyInAnimation delay={300}>
                <a href={data.appStoreUrl} target="_blank">
                  <img
                    alt='Get it on App Store'
                    src={AppStoreIcon}
                    height={48}
                  />
                </a>
              </FlyInAnimation>
              : null
          }
          <br />
          {
            data.googlePlayUrl ?
              <FlyInAnimation delay={300}>
                <a href={data.googlePlayUrl} target="_blank">
                  <img
                    alt='Get it on Google Play'
                    src={GooglePlayIcon}
                    height={48}
                  />
                </a>
              </FlyInAnimation>
              : null
          }
        </div>
        {
          (data.iframeUrl && width > 450) ?
            <FlyInAnimation delay={100}>
              <br />
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}>
                <PhoneFrame width={300} style={{ transform: 'translate(-12px, 0)' }} showContents={iframeLoaded}>
                  <iframe src={data.iframeUrl} onLoad={() => setIframeLoaded(true)} />
                </PhoneFrame>
                <a href={data.iframeUrl} target='_blank'>
                  <IconExpand
                    className='icon app-page-icon'
                    style={{
                      transform: 'translate(0px, 12px)'
                    }}
                  />
                </a>
              </div>
              <div style={{ height: 64 }} />
            </FlyInAnimation>
            : <div />
        }
      </div>
      <FlyInAnimation>
        <GalleryGridFromUrlList
          className='content-width'
          urls={data.images.map(getImageUrl)}
        />
      </FlyInAnimation>
      <div style={{ height: 16 }} />
      <FooterSection />
    </div>
  )
}