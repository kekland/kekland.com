import React from 'react'
import { useGetContentQuery } from '../../redux/api'
import ReactGA from 'react-ga'

const logAnalyticsAction = (href) => {
  ReactGA.event({
    category: 'redirect',
    action: 'anchor-click',
    label: href,
  })

  return true
}

export const Anchor = ({ href, children, style, download }) => {
  return (
    <a
      href={href}
      target={download ? '_self' : '_blank'}
      rel='noreferrer'
      style={style}
      download={download}
      onClick={() => logAnalyticsAction(href)}
    >
      {children}
    </a>
  )
}

export const AnchorLinkedIn = ({ children, style }) => {
  const { data } = useGetContentQuery()

  if (!data) {
    return (
      <></>
    )
  }

  return (
    <Anchor href={data.linkedInUrl} style={style}>
      {children}
    </Anchor>
  )
}

export const AnchorGithub = ({ children, style }) => {
  const { data } = useGetContentQuery()

  if (!data) {
    return (
      <></>
    )
  }

  return (
    <Anchor href={data.githubUrl} style={style}>
      {children}
    </Anchor>
  )
}

export const AnchorEmail = ({ children, style }) => {
  const { data } = useGetContentQuery()

  if (!data) {
    return (
      <></>
    )
  }

  return (
    <Anchor href={`mailto:${data.email}`} style={style}>
      {children}
    </Anchor>
  )
}