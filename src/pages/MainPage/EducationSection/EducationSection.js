import React from 'react'
import { getImageUrl } from '../../../api/api'
import { formatExperienceDate } from '../ExperienceSection/ExperienceSection'
import { ReactComponent as ArrowRight } from '../../../icons/chevron-forward-outline.svg'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import { useGetEducationQuery } from '../../../redux/api'
import { useWindowSize } from '../../../hooks/useWindowSize'
import { VerticalListWithLines } from '../../../components/VerticalListWithLines/VerticalListWithLines'
import { Anchor } from '../../../components/Anchor/Anchor'

const EducationItem = ({ data, minified }) => {
  const startDateString = formatExperienceDate(data.startDate)
  const endDateString = formatExperienceDate(data.endDate)
  const dates = `${startDateString} — ${endDateString}`

  return (
    <FlyInAnimation>
      <Anchor href={data.url} style={{ width: '100%' }}>
        <div className='experience-item'>
          <img src={getImageUrl(data.icon)} className='experience-item-image' />
          <div style={{ width: 16 }} />
          <div className='experience-item-text'>
            <div className='text-title' style={{ fontSize: minified ? 18 : 24 }}>
              {data.title}
            </div>
            <span style={{ opacity: 0.5, fontSize: minified ? 14 : 16 }}>
              {data.description}
            </span>
            <div style={{ height: 4 }} />
            {
              minified ?
                <span style={{ opacity: 0.25, fontSize: 14 }}>
                  {dates}
                </span> : null
            }
            <span style={{ opacity: 0.25, fontSize: minified ? 14 : 16 }}>
              {data.location} {data.grade ? `· ${data.grade}` : null}
            </span>
          </div>
          {
            !minified ? <div className='experience-item-duration' style={{ opacity: 0.5 }}>
              <span>
                {dates}
              </span>
            </div> : null
          }
          <div style={{ width: 32 }} />
          <ArrowRight className='icon' width={24} />
        </div>
      </Anchor>
    </FlyInAnimation>
  )
}

export const EducationSection = () => {
  const { data } = useGetEducationQuery()
  const { width } = useWindowSize()

  let children = []

  if (data) {
    children = [
      ...children,
      ...data.map((v) =>
        <EducationItem key={v.id} data={v} minified={width < 768} />
      ),
    ]
  }

  return (
    <div id='my-experience' className='section'>
      <FlyInAnimation>
        <p className='text-title text-primary'>my education</p>
      </FlyInAnimation>
      <VerticalListWithLines gap={16}>
        {children}
      </VerticalListWithLines>
    </div>
  )
}