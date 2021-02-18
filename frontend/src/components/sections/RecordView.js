import './recordview.css'

import IconButton from '@material-ui/core/IconButton'
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React from 'react'
import { useReactMediaRecorder } from 'react-media-recorder'

const useStyles = makeStyles((theme) => ({

  flicker: {
    animationName: '$flicker',
    animationDuration: '250ms',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out'
  },

  recordButton: {
    color: theme.palette.common.orange

  },

  '@keyframes flicker': {
    from: {
      opacity: 1
    },
    to: {
      opacity: 0.4
    }
  }

}))

const RecordView = () => {
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({ video: false })
  const classes = useStyles()
  return (
    <div className="recorder">
      <p>{status}</p>
      {status !== 'recording'
        ? <IconButton onClick={startRecording}><FiberManualRecordRoundedIcon className={classes.recordButton}/></IconButton>
        : <IconButton onClick={stopRecording}><FiberManualRecordRoundedIcon className={clsx(classes.recordButton, { [classes.flicker]: status === 'recording' })} /></IconButton>}
      <audio src={mediaBlobUrl} controls autoPlay loop />
    </div>
  )
}

export default RecordView
