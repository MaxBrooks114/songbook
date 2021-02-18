import { makeStyles } from '@material-ui/styles'
import AudioPlayer from 'material-ui-audio-player'
import React from 'react'

const useStyles = makeStyles((theme) => ({

  root: {
    margin: 0,
    background: theme.palette.primary.main,
    color: theme.palette.info.main,
    [theme.breakpoints.down('sm')]: {
      width: '100%',

      '& .makeStyles-sliderContainerWrapper-118': {
        alignItems: 'center'
      }
    }

  },

  playIcon: {
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.gray
    },

    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: 32
    }
  },

  pauseIcon: {
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.gray
    },
    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: 32
    }
  },

  loopIcon: {
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.gray
    },
    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: 32
    }

  },

  volumeIcon: {
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.gray
    },
    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: 32
    }
  },

  replayIcon: {
    '&:hover': {
      color: theme.palette.common.gray
    },
    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: 32
    }
  },

  volumeSlider: {
    [theme.breakpoints.down('sm')]: {
      height: 32,
      width: 32
    }
  },
  progressTime: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.67rem',
      alignItems: 'center'
    }
  },

  mainSlider: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '.67rem',
      alignItems: 'center'
    }
  }
}))

const Player = ({ src }) => {
  return (

      <AudioPlayer
    rounded
    useStyles={useStyles}
    src={src}
    loop={true}
  />

  )
}

export default Player
