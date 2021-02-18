import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import trebleClef from '../../assets/trebleClef.png'

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 70,
    textAlign: 'center'
  },

  graphic: {
    display: 'block',
    margin: '50px auto',
    width: 120,
    height: 280
  },

  message: {
    display: 'block',
    margin: '0 auto',
    overflowWrap: 'normal',
    width: '100%'
  }

}))
const NoMusicMessage = ({ objectType }) => {
  const classes = useStyles()
  const location = useLocation()
  return !location.pathname.includes('new')
    ? (
    <div className={classes.container}>
      <img className={classes.graphic} src={trebleClef} alt="treble-clef"/>
      <Typography className={classes.message}>You have no {objectType}! Add one by following this <Link to={`/${objectType}/new`}>link</Link></Typography>
    </div>
      )
    : null
}

export default NoMusicMessage
