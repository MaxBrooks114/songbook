
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import PlayCircleOutlineRoundedIcon from '@material-ui/icons/PlayCircleOutlineRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { playSection } from '../../actions/spotify'
import { titleCase } from '../../helpers/detailHelpers'
import DetailAccordion from '../sharedComponents/DetailAccordion'

const useStyles = makeStyles((theme) => ({

  buttonContainer: {
    marginTop: theme.spacing(2),
    margin: theme.spacing(1)
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.darkGreen
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
  }

}))

const SongSections = ({ song, instrument }) => {
  const sections = useSelector((state) =>
    Object.values(state.sections).filter((section) => instrument ? song.sections.includes(section.id) && instrument.sections.includes(section.id) : song.sections.includes(section.id)))
  const player = useSelector(state => state.spotifyPlayer)
  const loading = useSelector((state) => state.loading)
  const deviceId = useSelector((state) => state.auth.user.spotify_info.device_id)
  const accessToken = useSelector((state) => state.auth.user.spotify_info.access_token)
  const refreshToken = useSelector((state) => state.auth.user.spotify_info.refresh_token)
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleSectionPlayClick = (section) => {
    dispatch(playSection(accessToken, song.spotify_url, refreshToken, section.start, section.duration, deviceId, section.id))
  }

  const renderSpotifyOptionSection = (section) => {
    if (accessToken && accessToken !== '') {
      if (loading.loading && section.id === player.sectionId) {
        return <IconButton><CircularProgress thickness={2.4} size={20} /></IconButton>
      } else {
        return <IconButton onClick={() => handleSectionPlayClick(section)}><PlayCircleOutlineRoundedIcon className={classes.playButton} /></IconButton>
      }
    }
  }

  const renderSections = () => {
    return sections
      ? sections.map((section, index) => {
        return index !== sections.length - 1
          ? (
            <React.Fragment key={section.id}>
              <Grid item xs={12} lg={3}>
                <Grid container alignItems="center" align="center" justify="center">
                 <Grid item xs={4} sm={3} lg={6}>
                    <Typography>
                      <Link className={classes.link} to={`/sections/${section.id}`}>{section.name}</Link>
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    {renderSpotifyOptionSection(section)}
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
            )
          : (
            <React.Fragment key={section.id}>
              <Grid item xs={12} lg={3}>
                  <Grid container alignItems="center" align="center" justify="center">
                  <Grid item xs={4} sm={3} lg={6}>
                      <Typography>
                        <Link className={classes.link} to={`/sections/${section.id}`}>{section.name}</Link>
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      {renderSpotifyOptionSection(section)}
                    </Grid>
                  </Grid>
              </Grid>
              <Grid item xs={3} >
                <IconButton onClick={() => history.push('/sections/new')}>
                  <AddRoundedIcon/>
                </IconButton>
              </Grid>
            </React.Fragment>
            )
      })
      : null
  }
  return (
   <DetailAccordion title={!instrument ? 'Sections' : <Link className={classes.link} to={`/songs/${song.id}`}>{titleCase(song.title)}</Link>} justify="flex-start" renderFunction={renderSections}/>
  )
}

export default SongSections
