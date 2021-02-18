import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import GetAppIcon from '@material-ui/icons/GetApp'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { importSpotifyTrack } from '../../actions/spotify'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: 'black',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[24],
    alignItems: 'flex-start',
    position: 'relative'
  },

  button: {
    height: 32,
    width: 32,
    color: theme.palette.background.default,
    '&:hover': {
      transition: '.4s',
      filter: 'drop-shadow(0px 3px 15px rgba(0,0,0,.2))'
    }
  },

  buttonContainer: {
    position: 'absolute',
    height: 34,
    width: 34,
    bottom: 10,
    right: '.5rem',
    borderRadius: 4

  },

  cardContent: {
    color: theme.palette.info.main,
    height: 64
  },

  dialog: {
    '& .MuiDialog-paper': {
      background: theme.palette.secondary.main

    },

    '& .MuiTypography-root': {
      color: theme.palette.info.main
    },

    '& .MuiButton-textPrimary': {
      color: theme.palette.info.main
    }

  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main
  },

  media: {
    height: '100%',
    objectFit: 'contain',
    width: '100%'
  },

  spacer: {
    width: 200,
    height: 48,
    float: 'left',
    display: 'inline-block'
  },

  spinner: {
    color: theme.palette.background.default
  },

  spinnerContainer: {
    marginTop: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  trackInfo: {
    color: theme.palette.info.main,
    fontWeight: 600,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  },

  trackTitle: {
    fontWeight: '700',
    color: theme.palette.info.main,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  }

}))

const SpotifyTrack = ({ track, transitionDuration }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const songs = useSelector(state => (state.songs))
  const loading = useSelector(state => (state.loading))
  const importer = useSelector(state => state.spotifyTracks)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    if (!Object.values(songs).length || !Object.values(songs).some(song => song.spotify_id)) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root}>
        <CardMedia
        ><img className={classes.media} alt={track.album.name} src={track.album.images.length > 0 ? track.album.images[0].url : null}/></CardMedia>
        <div className={classes.cardBody}>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.trackTitle} variant="subtitle1">
              {track.name} < br/>
            </Typography>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography className={classes.trackInfo} variant="subtitle2">
              {track.artists[0].name} < br/>
              {track.album.name}
            </Typography>
          </CardContent>
          <div id="spacer" className={classes.spacer} />
        </div>
        <CardActions className={classes.cardActions}>
          <IconButton
            className={classes.buttonContainer}
            disableRipple
            onClick={() => {
              handleClickOpen()
              dispatch(importSpotifyTrack(track.id))
            }}
          >
           {loading.loading && importer.importedSong === track.id ? <div className={classes.spinnerContainer}><CircularProgress thickness={2.4} size={20} className={classes.spinner} /></div> : <GetAppIcon className={classes.button}/> }
          </IconButton>
        </CardActions>
      </Card>
    </Slide>
     <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.dialog}
        >
          <DialogTitle id="alert-dialog-title">{'Congratulations! You just imported your first song!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              When you import a song using this feature, SongBook automatically generates song data and section data for you to peruse and/or edit. Also if you haven't yet- integrate your spotify if you have premium to unlock all features that SongBook has to offer! Choose one of the links below to continue to your song or section pages, or stay here and import more songs!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container justify="space-evenly">
              <Grid item >
                <Link to='/songs' className={classes.link}>
                  Songs
                </Link>
              </Grid>
              <Grid item>
                <Link to='/sections' className={classes.link}>
                  Sections
                </Link>
              </Grid>
              <Grid item>
                <Typography onClick={handleClose} className={classes.link}>
                  Stay
                </Typography>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </>
  )
}

export default SpotifyTrack
