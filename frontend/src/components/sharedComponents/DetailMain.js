import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import PauseCircleOutlineRoundedIcon from '@material-ui/icons/PauseCircleOutlineRounded'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import * as workerTimers from 'worker-timers'

import { checkIfPlaying, playSection, playSong, pressPausePlayer } from '../../actions/spotify'
import BackDrop from '../ui/BackDrop'

const useStyles = makeStyles((theme) => ({

  albumContainer: {
    position: 'relative'
  },

  bigPauseButtonContainer: {
    position: 'absolute',
    top: '0',
    bottom: 4,
    left: '0',
    right: '0',
    opacity: '.6',
    borderRadius: 4,
    transition: '.3s ease',
    '&:hover': {
      background: theme.palette.info.main

    }

  },

  bigPlayButton: {
    color: theme.palette.background.default,
    height: '100%',
    width: '100%'

  },

  bigPlayButtonContainer: {
    position: 'absolute',
    top: '0',
    bottom: 4,
    left: '0',
    right: '0',
    opacity: '.7',
    borderRadius: 4,

    transition: '.3s ease',
    '&:hover': {
      background: theme.palette.info.main,
      opacity: '.6'
    }
  },

  buttonContainer: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1)
  },

  container: {
    [theme.breakpoints.down('md')]: {
      display: 'block',
      margin: 'auto'

    }
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.darkGreen
    }
  },

  lyrics: {
    textTransform: 'none'
  },

  media: {
    objectFit: 'fill',
    borderRadius: 4,
    height: '100%',
    width: '100%'

  },

  menu: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.info.main

  },

  menuItem: {
    ...theme.typography.tab,
    '& .MuiMenuItem-root': {
      justifyContent: 'center'
    }
  },

  playButton: {
    color: theme.palette.background.default
  },

  spinnerContainer: {
    marginTop: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  title: {
    fontWeight: 600,
    display: 'inline'
  }

}))

const DetailMain = ({ title, subtitle1, subtitle2, image, uploadedImage, album, spotifyUri, song, section }) => {
  const player = useSelector(state => state.spotifyPlayer, shallowEqual)
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id, shallowEqual)
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token, shallowEqual)
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token, shallowEqual)
  const loading = useSelector((state) => state.loading)
  const dispatch = useDispatch()
  const classes = useStyles()
  const theme = useTheme()
  const medScreen = useMediaQuery(theme.breakpoints.down('md'))
  const [showBackdrop, setShowBackdrop] = useState(false)

  useEffect(() => {
    const intervalId = accessToken ? workerTimers.setInterval(() => { dispatch(checkIfPlaying(accessToken, refreshToken)) }, 1000) : null
    if (accessToken) {
      return () => {
        workerTimers.clearInterval(intervalId)
      }
    }
  }, [accessToken, refreshToken, dispatch])

  const sectionPlay = () => {
    setShowBackdrop(true)
    const timeout = workerTimers.setTimeout(() => {
      dispatch(playSection(accessToken, spotifyUri, refreshToken, section.start, section.duration, deviceId, section.id))
      setShowBackdrop(false)
      workerTimers.clearTimeout(timeout)
    }, 3000)
  }
  const handlePlayClick = () => {
    song ? dispatch(playSong(accessToken, spotifyUri, refreshToken, deviceId)) : sectionPlay()
  }

  const handlePauseClick = () => {
    dispatch(pressPausePlayer(accessToken, refreshToken, deviceId, spotifyUri))
  }

  const renderSpotifyOption = () => {
    if (accessToken && accessToken !== '' && spotifyUri) {
      if (loading.loading) {
        return <div className={classes.bigPlayButtonContainer}><div className={classes.spinnerContainer}><CircularProgress thickness={2.4} size={88} /></div></div>
      } else {
        return playButton
      }
    }
  }

  const playButton = player.playing && (player.songPlay || player.sectionPlay) && (player.song === spotifyUri || (section ? player.sectionId === section.id : null))
    ? <IconButton className={classes.bigPauseButtonContainer} onClick={handlePauseClick}><PauseCircleOutlineRoundedIcon className={classes.bigPlayButton} /></IconButton>
    : <IconButton className={classes.bigPlayButtonContainer} onClick={handlePlayClick}><PlayCircleOutlineRoundedIcon className={classes.bigPlayButton} /></IconButton>

  return (
    <Grid container justify={medScreen ? 'center' : 'flex-start'} className={classes.container} align={medScreen ? 'center' : undefined} alignItems="center">
      <Grid item xs={10} sm={8} md={6} lg={3} className={classes.albumContainer}>
        {renderSpotifyOption()}
        <img
          alt={album}
          className={classes.media}
          src={image || uploadedImage}
        />
      </Grid>
      <Grid item xs={1} ></Grid>
      <Grid item xs={12} md={12} lg={7}>
        <Typography variant={medScreen ? 'h6' : 'h5'} className={classes.title}>{title}</Typography>
        <Typography variant={medScreen ? 'subtitle1' : 'h6'}>{subtitle1}</Typography>
        <Typography variant={medScreen ? 'subtitle1' : 'h6'}>{subtitle2}</ Typography>
      </Grid>
      <BackDrop showBackdrop={showBackdrop}/>
    </Grid>

  )
}

export default DetailMain
