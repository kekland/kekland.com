import React from 'react'
import { Button } from '../../components/Button/Button'
import './NotFoundPage.css'

import { ReactComponent as HelpIcon } from '../../icons/help-outline.svg'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div className='page not-found-page'>
      <div className='not-found-page-items'>
        <HelpIcon className='icon not-found-icon' />
        <span className='text-title' style={{ opacity: 0.5 }}>
          Uh oh...
        </span>
        <span style={{ opacity: 0.5 }}>
          This page was not found
        </span>
        <div style={{ height: 24 }} />
        <Link to='/'>
          <Button>
            Go back
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage;
