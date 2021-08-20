import React from 'react'
import { useGetContentQuery } from '../../redux/api'

export const Anchor = ({ href, children, style, download, className }) => {
  return (
    <a
      href={href}
      target={download ? '_self' : '_blank'}
      rel='noreferrer'
      style={style}
      className={className}
      download={download}
    >
      {children}
    </a>
  )
}

export const AnchorLinkedIn = ({ children, style }) => {
  const { data } = useGetContentQuery()

  return (
    <Anchor href={data?.linkedInUrl} style={style}>
      {children}
    </Anchor>
  )
}

export const AnchorGithub = ({ children, style }) => {
  const { data } = useGetContentQuery()

  return (
    <Anchor href={data?.githubUrl} style={style}>
      {children}
    </Anchor>
  )
}

export const AnchorEmail = ({ children, style }) => {
  const { data } = useGetContentQuery()

  return (
    <Anchor href={data ? `mailto:${data.email}` : ''} style={style}>
      {children}
    </Anchor>
  )
}

export const AnchorLastFm = ({ children, style }) => {
  const { data } = useGetContentQuery()

  return (
    <Anchor href={data?.lastFmUrl} style={style}>
      {children}
    </Anchor>
  )
}
