import { useCallback, useEffect, useState } from 'react'

function useHeight (sectionRef) {
  const [height, setHeight] = useState(null)

  const updateHeight = useCallback(() => {
    if (sectionRef && sectionRef.current) {
      const { height } = sectionRef.current.getBoundingClientRect()
      setHeight(height)
    }
  }, [sectionRef])

  useEffect(() => {
    updateHeight()
    window.addEventListener('transitionstart', updateHeight)
    return () => {
      window.removeEventListener('transitionstart', updateHeight)
    }
  }, [updateHeight])
  return [height]
}

export default useHeight
