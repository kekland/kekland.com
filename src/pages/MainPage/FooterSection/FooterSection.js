import React from 'react'
import './FooterSection.css'

import { ReactComponent as IconCodeSlash } from '../../../icons/code-slash.svg'
import { Anchor } from '../../../components/Anchor/Anchor'
import { useGetContentQuery } from '../../../redux/api'

export const FooterSection = () => {
  const { data } = useGetContentQuery()

  return (
    <div className='footer-section'>
      <span style={{ opacity: 0.5 }}>Built with &lt;3 by <b>kekland</b></span>
      <div style={{ width: 16 }} />
      {
        data ?
          <Anchor href={data?.sourceUrl}>
            <IconCodeSlash className='footer-source icon' />
          </Anchor>
          : null
      }

    </div>
  )
}