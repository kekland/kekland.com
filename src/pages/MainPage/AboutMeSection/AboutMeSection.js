import React from 'react'
import './AboutMeSection.css'

import ReactMarkdown from 'react-markdown';
import { FlyInAnimation } from '../../../components/FlyInAnimation/FlyInAnimation';
import { useGetContentQuery } from '../../../redux/api';
import { getImageUrl } from '../../../api/api';

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const year = day * 365

export const AboutMeSection = ({ titleRef }) => {
  const { data } = useGetContentQuery()

  const birthdate = (new Date(2002, 11, 7)).getTime()
  const now = Date.now()
  const age = ((now - birthdate) / year).toFixed(1)

  return (
    <div className='section' id='about-me' ref={titleRef}>
      <FlyInAnimation>
        <p className='text-title text-primary'>about me</p>
      </FlyInAnimation>
      <div className='about-me-contents'>
        <FlyInAnimation>
          {
            <div className='about-me-image'>
              {
                data?.photo ?
                  <img
                    src={getImageUrl(data.photo)}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: 32,
                    }}
                  /> : null
              }
            </div>
          }
        </FlyInAnimation>
        <FlyInAnimation delay={100}>
          {
            data?.aboutMe ?
              <ReactMarkdown className='about-me-text'>
                {
                  data.aboutMe.replace('{age}', age)
                }
              </ReactMarkdown> :
              <div className='shimmer-item' style={{ width: 200, height: 18 }} />
          }
        </FlyInAnimation>
      </div>
    </div>
  );
}