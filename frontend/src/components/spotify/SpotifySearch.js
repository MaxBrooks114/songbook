import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'

import SpotifySearchBar from './SpotifySearchBar'
import SpotifyTrackList from './SpotifyTrackList'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    minHeight: '100vh'

  },

  cardGrid: {
    marginBottom: theme.spacing(8)
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  }

}))

const SpotifySearch = () => {
  const classes = useStyles()

  const tracks = useSelector((state) => state.spotifyTracks.tracks)

  const renderTracklist = () => {
    return Object.keys(tracks).length > 0 ? <SpotifyTrackList tracks={Object.values(tracks)} /> : ''
  }

  return (
    <div className={classes.root}>
      <div className={classes.toolbarMargin}></div>
      <Grid container justify="center" className={classes.cardGrid} >
        <Grid item xs={12}>
        <Typography variant="h2" align="center" gutterBottom>
          Spotify Search
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" gutterBottom>
          search a song, learn a song
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <SpotifySearchBar />
      </Grid>
      <Grid item xs={10} >
      {renderTracklist()}
      </Grid>
      </Grid>

    </div>
  )
}

export default SpotifySearch
