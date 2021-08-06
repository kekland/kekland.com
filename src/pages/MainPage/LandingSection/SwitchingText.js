import React, { useEffect, useState } from 'react';
import './SwitchingText.css';

export const SwitchingText = ({ labels }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      let newIndex = currentIndex + 1
      if(newIndex === labels.length) newIndex = 0

      setCurrentIndex(newIndex)
    }, 750)
  }, [currentIndex, labels])

  return (
    <span className='switching-text'>
      {labels[currentIndex]}
    </span>
  );
}