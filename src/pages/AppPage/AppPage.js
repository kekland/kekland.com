import React, { useState } from 'react'
import './AppPage.css'

import { useParams } from 'react-router'
import { getImageUrl } from '../../api/api'
import { ModalNavbar } from '../../components/Navbar/Navbar'
import { PhoneFrame } from '../../components/PhoneFrame/PhoneFrame'
import ReactMarkdown from 'react-markdown'
import GooglePlayIcon from '../../icons/google-play.png'
import AppStoreIcon from '../../icons/app-store.png'
import { ReactComponent as IconDesktop } from '../../icons/desktop-outline.svg'
import { ReactComponent as IconGithub } from '../../icons/logo-github.svg'
import { ReactComponent as IconExpand } from '../../icons/expand.svg'
import { GalleryGridFromUrlList } from '../GalleryPage/GalleryPage'
import { FooterSection } from '../MainPage/FooterSection/FooterSection'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Anchor } from '../../components/Anchor/Anchor'
import { useGetAppQuery } from '../../redux/api'
import { Page } from '../../components/Page/Page'

export const AppPage = () => {
  const { id } = useParams()
  const { data } = useGetAppQuery(id)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const { width } = useWindowSize()

  if (!data) {
    return (
      <Page title={'Erzhan\'s app'}>
        <div className='page app-page'>
          <ModalNavbar
            icon={<div style={{ width: 20, height: 20 }} />}
            title={'App'}
            useScrollEffects />
          <div style={{ height: '100vh' }} />
          <FooterSection />
        </div>
      </Page>
    )
  }

  return (
    <Page title={data.title}>
      <div className='page app-page'>
        <ModalNavbar
          icon={<img src={getImageUrl(data.icon)} width='20px' height='20px' />}
          title={data.title}
          useScrollEffects
          marginLeft={8}
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
                    <Anchor href={data.iframeUrl} style={{ marginRight: 16 }}>
                      <IconDesktop className='icon app-page-icon' />
                    </Anchor> : null
                }
                {
                  data.repositoryUrl ?
                    <Anchor href={data.repositoryUrl}>
                      <IconGithub className='icon app-page-icon' />
                    </Anchor> : null
                }
              </div>
            </FlyInAnimation>
            <br />
            {
              data.appStoreUrl ?
                <FlyInAnimation delay={300}>
                  <Anchor href={data.appStoreUrl}>
                    <img
                      alt='Get it on App Store'
                      src={AppStoreIcon}
                      height={48}
                    />
                  </Anchor>
                </FlyInAnimation>
                : null
            }
            <br />
            {
              data.googlePlayUrl ?
                <FlyInAnimation delay={300}>
                  <Anchor href={data.googlePlayUrl}>
                    <img
                      alt='Get it on Google Play'
                      src={GooglePlayIcon}
                      height={48}
                    />
                  </Anchor>
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
                  <Anchor href={data.iframeUrl}>
                    <IconExpand
                      className='icon app-page-icon'
                      style={{
                        transform: 'translate(0px, 12px)'
                      }}
                    />
                  </Anchor>
                </div>
                <div style={{ height: 64 }} />
              </FlyInAnimation>
              : <div />
          }
          <GalleryGridFromUrlList
            className='app-page-gallery'
            urls={data.images.map(getImageUrl)}
          />
        </div>
        <div style={{ height: 16 }} />
        <FooterSection />
      </div>
    </Page>
  )
}

export default AppPage;
