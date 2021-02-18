import { makeStyles } from '@material-ui/core/styles'
import React from 'react'

import errorGraphic from '../../assets/errorGraphic.png'

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh'

  },

  graphic: {
    display: 'block',
    margin: '0 auto',
    width: 1000
  }
}))
const ErrorPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <img className={classes.graphic} src={errorGraphic} alt="404 message"/>
    </div>
  )
}

export default ErrorPage
