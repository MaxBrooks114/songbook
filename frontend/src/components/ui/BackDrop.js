import Backdrop from '@material-ui/core/Backdrop'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import Countdown from './Countdown'

const useStyles = makeStyles((theme) => ({

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },

  countIn: {
    display: 'inline',
    textTransform: 'none'
  }

}))

const BackDrop = ({ count, showBackdrop }) => {
  const classes = useStyles()

  const renderCounter = () => {
    return showBackdrop ? <Countdown/> : ''
  }
  return (
    <>
       <Backdrop className={classes.backdrop} open={showBackdrop}>
            <Typography className={classes.countIn}>Playing in {renderCounter()}</Typography>
        </Backdrop>
    </>
  )
}

export default BackDrop
