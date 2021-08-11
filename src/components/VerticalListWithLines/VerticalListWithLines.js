import React from 'react'
import './VerticalListWithLines.css'
import { ReactComponent as LineMiddle } from '../../icons/line-vert-mid.svg'
import { ReactComponent as LineEnd } from '../../icons/line-vert-end.svg'

export const VerticalListWithLines = ({ children, gap }) => {
  const _children = Array.isArray(children) ? children : [children]
  const transformedChildren = []

  if (_children.length === 0) {
    return (
      <></>
    )
  }

  for (let i = 0; i < _children.length; i++) {
    if (i === _children.length - 1) {
      transformedChildren.push(
        <div className='vertical-line vertical-line-end' key={`arrow-${i}`}>
          <LineEnd />
        </div>
      )
    }
    else {
      transformedChildren.push(
        <div className='vertical-line vertical-line-middle' key={`arrow-${i}`}>
          <LineMiddle />
        </div>
      )
    }

    transformedChildren.push(
      <div className='vertical-line-content' key={`content-${i}`}>
        {_children[i]}
      </div>
    )
  }

  return (
    <div className='vertical-list-with-lines' style={{ gap: `0 ${gap ?? 32}px` }}>
      {transformedChildren}
    </div>
  )
}