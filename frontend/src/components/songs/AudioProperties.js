import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MusicNoteRoundedIcon from '@material-ui/icons/MusicNoteRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

import { audioFeaturesToText, titleCase } from '../../helpers/detailHelpers'
import DetailAccordion from '../sharedComponents/DetailAccordion'

const useStyles = makeStyles((theme) => ({

  grayedOutMusicNote: {
    opacity: '.3'
  }

}))

const AudioProperties = ({ song }) => {
  const classes = useStyles()
  const theme = useTheme()
  const medScreen = useMediaQuery(theme.breakpoints.down('md'))

  const songFeatureIcons = {
    low: <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon className={classes.grayedOutMusicNote}/><MusicNoteRoundedIcon className={classes.grayedOutMusicNote}/></>,
    medium: <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/><MusicNoteRoundedIcon className={classes.grayedOutMusicNote}/></>,
    high: <><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/><MusicNoteRoundedIcon/></>
  }

  const renderAudioProperties = () => {
    const audioFeatures = ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'valence']
    return audioFeatures.map((feature, index) => {
      return index % 2 === 0
        ? (
        <React.Fragment key={feature}>
          {medScreen ? null : <Grid item xs={2}/>}
          <Grid item xs={10} lg={5} >
            <Typography> {titleCase(feature)}: {songFeatureIcons[audioFeaturesToText(song[feature])]}</Typography>
           </Grid>
        </React.Fragment>
          )
        : (
        <Grid item xs={10} lg={5} key={feature}>
          <Typography> {titleCase(feature)}: {songFeatureIcons[audioFeaturesToText(song[feature])]}</Typography>
        </Grid>
          )
    })
  }
  return (
    <DetailAccordion title="Audio Properties" justify="center" renderFunction={renderAudioProperties}/>
  )
}

export default AudioProperties
