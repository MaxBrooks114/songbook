import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import SpotifyTrack from './SpotifyTrack'

const useStyles = makeStyles((theme) => ({

  cardGrid: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4)
  }
}))

const SpotifyTrackList = ({ tracks }) => {
  const classes = useStyles()
  let transitionDuration = 50

  const renderedList = tracks.map((track) => {
    transitionDuration += 450
    return (
      <Grid key={track.id} item xs={12} sm={12} md={6} lg={3}>
        <SpotifyTrack track={track} transitionDuration={transitionDuration} />
      </Grid>
    )
  })

  return (

    <div className={classes.root}>
      <Grid container className={classes.cardGrid} spacing={6}>
        {renderedList}
      </Grid>
    </div>
  )
}

export default SpotifyTrackList
