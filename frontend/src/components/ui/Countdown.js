import React, { useState } from 'react'

import useInterval from '../../hooks/useInterval'

const Countdown = () => {
  const [countIn, setCountIn] = useState(3)

  useInterval(() => {
    setCountIn(countIn - 1)
  }, 1000)

  return (
    <div style={{ display: 'inline' }}>
      {countIn}
    </div>
  )
}

export default Countdown
