import React from 'react'
import './ExperienceSection.css'

import { ReactComponent as ArrowRight } from '../../../icons/chevron-forward-outline.svg'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import { VerticalListWithLines } from '../../../components/VerticalListWithLines/VerticalListWithLines'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { useGetWorkExperienceQuery } from '../../../redux/api'
import { getImageUrl } from '../../../api/api'
import { Anchor } from '../../../components/Anchor/Anchor'

export const formatExperienceDate = (date) => {
  if (!date) return 'current'
  const _date = new Date(date)
  return _date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
}

const _second = 1000
const _minute = 60 * _second
const _hour = 60 * _minute
const _day = 24 * _hour
const _month = 30 * _day
export const getExperienceDuration = (startDate, endDate) => {
  const _startDate = new Date(startDate)
  const _endDate = endDate ? new Date(endDate) : new Date()

  const millis = _endDate.getTime() - _startDate.getTime()
  const months = Math.floor((millis / _month) % 12)
  const years = Math.floor((millis / _month) / 12)

  const strings = []
  if (years > 0) {
    strings.push(`${years} ${years > 1 ? 'years' : 'year'}`)
  }
  if (months > 0) {
    strings.push(`${months} ${months > 1 ? 'months' : 'month'}`)
  }

  return strings.join(' ')
}

const ExperienceItem = ({ data, minified }) => {
  const startDateString = formatExperienceDate(data.startDate)
  const endDateString = formatExperienceDate(data.endDate)
  const dates = `${startDateString} — ${endDateString}`

  const durationString = getExperienceDuration(data.startDate, data.endDate)

  return (
    <Anchor href={data.url} style={{ width: '100%' }}>
      <FlyInAnimation>
        <div className='experience-item'>
          <img src={getImageUrl(data.icon)} className='experience-item-image' />
          <div style={{ width: 16 }} />
          <div className='experience-item-text'>
            <div className='text-title' style={{ fontSize: minified ? 20 : 24 }}>
              {data.company}
            </div>
            <span style={{ fontSize: minified ? 14 : 16 }}>
              {data.title}
            </span>
            <div style={{ height: 4 }} />
            {
              minified ?
                <span style={{ opacity: 0.5, fontSize: 14 }}>
                  {dates}
                </span> : null
            }

            <span style={{ opacity: 0.5, fontSize: minified ? 14 : 16 }}>
              {data.technologies}
            </span>
          </div>
          {
            !minified ? <div className='experience-item-duration' style={{ opacity: 0.5 }}>
              <span>
                {dates}
              </span>
              <span style={{ fontSize: 14, opacity: 0.5 }}>
                {durationString}
              </span>
            </div> : null
          }

          <div style={{ width: 32 }} />
          <ArrowRight className='icon' width={24} style={{ opacity: 0.5 }} />
        </div>
      </FlyInAnimation>
    </Anchor>
  )
}

export const ExperienceSection = () => {
  const { data } = useGetWorkExperienceQuery()
  const { width } = useWindowSize()

  let children = []

  if (data) {
    children = [
      ...children,
      ...data.map((v) =>
        <ExperienceItem key={v.id} data={v} minified={width < 768} />
      ),
    ]
  }

  return (
    <div id='my-experience' className='section'>
      <FlyInAnimation>
        <p className='text-title text-primary'>my work experience</p>
      </FlyInAnimation>
      <VerticalListWithLines gap={16}>
        {children}
      </VerticalListWithLines>
    </div>
  )
}