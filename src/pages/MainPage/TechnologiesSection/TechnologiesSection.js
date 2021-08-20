import React from 'react'
import { getImageUrl } from '../../../api/api'
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation'
import { useGetTechnologiesQuery } from '../../../redux/api'
import './TechnologiesSection.css'

const proficiencyToText = (proficiency) => {
  if (proficiency >= 0.8) {
    return 'Expert'
  }
  else if (proficiency >= 0.6) {
    return 'Proficient'
  }
  else if (proficiency >= 0.4) {
    return 'Intermediate'
  }

  return 'Beginner'
}

const proficiencyToColor = (proficiency) => {
  if (proficiency >= 0.8) {
    return 'var(--color-primary)'
  }

  return '#084C61'
}

const TechnologyItem = ({ data }) => {
  return (
    <div className='technology-item'>
      <img className='technology-item-image' src={getImageUrl(data.image)} />
      <div style={{ width: 24 }} />
      <div className='technology-item-title'>
        <div className='text-title'>
          {data.name}
        </div>
        <div style={{ opacity: 0.5, fontSize: 14 }}>
          {proficiencyToText(data.proficiency)}
        </div>
        <div style={{ height: 8 }} />
        <div className='technology-item-progress'>
          <div style={{
            width: `${data.proficiency * 100}%`,
            backgroundColor: proficiencyToColor(data.proficiency)
          }} />
        </div>
      </div>
    </div>
  )
}

export const TechnologiesSection = () => {
  const { data } = useGetTechnologiesQuery()

  let children
  if (data) {
    children = data.map((v) => <TechnologyItem key={v.id} data={v} />)
  }

  return (
    <div className='section'>
      <FlyInAnimation>
        <p className='text-title text-primary' style={{ display: 'flex', alignItems: 'baseline' }}>
          technologies
        </p>
      </FlyInAnimation>
      <div className='section-grid-small' style={{ rowGap: 48 }}>
        {children}
      </div>
    </div>
  )
}