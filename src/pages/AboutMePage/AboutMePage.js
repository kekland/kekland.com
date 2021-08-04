import React from 'react'
import { FlyInAnimation } from '../../components/FlyInAnimation/FlyInAnimation';

const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24
const year = day * 365

export const AboutMePage = () => {
  const birthdate = (new Date(2002, 11, 7)).getTime()
  const now = Date.now()
  const age = ((now - birthdate) / year).toFixed(1)

  return (
    <div className='page'>
      <FlyInAnimation>
        <p className='text-title text-primary'>about me</p>
      </FlyInAnimation>
      <FlyInAnimation>
        <p>
          Hi! I'm <b>Erzhan</b>, a {age} old year full-stack developer from Almaty, Kazakhstan. 
          <br /> I'm also interested in
          mechanical and electrical engineering, and I did robotics at school.
        </p>
      </FlyInAnimation>
      <FlyInAnimation>
        <p>
          In my spare time I do photography :)
        </p>
      </FlyInAnimation>
    </div>
  );
}