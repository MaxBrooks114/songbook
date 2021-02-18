
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deleteSong } from '../../actions/songs'
import { millisToMinutesAndSeconds } from '../../helpers/detailHelpers'
import DeleteDialog from '../sharedComponents/DeleteDialog'
import DetailTitle from '../sharedComponents/DetailTitle'
import Features from '../sharedComponents/Features'
import Lyrics from '../sharedComponents/Lyrics'
import NavRow from '../sharedComponents/NavRow'
import SongSections from '../sharedComponents/SongSections'
import VertMenu from '../sharedComponents/VertMenu'
import AudioProperties from './AudioProperties'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    transition: '.3s ease',
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    position: 'relative',
    marginBottom: '8rem',
    padding: 22
  },
  details: {
    color: theme.palette.info.main
  },

  vert: {
    padding: 0,
    position: 'absolute',
    right: '1%',
    top: 22
  }

}))

const SongDetail = () => {
  const params = useParams()
  const song = useSelector(state => state.songs[params.id])

  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const popped = Boolean(anchorEl)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return song
    ? (
    <Slide in transition={1000}>
      <Paper className={classes.root} elevation={3}>
        <Grid container alignItems="center" justify="flex-start" className={classes.details}>
          <IconButton
              className={classes.vert}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleMenuClick(event)}
          > <MoreVertRoundedIcon />
          </IconButton>
          <VertMenu
              song={song}
              objectType="songs"
              popped={popped}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              setOpen={setOpen}
          />
          <Grid item xs={12}>
            <DetailTitle
              song={song}
              title={`${song.title} (${millisToMinutesAndSeconds(song.duration)})`}
              subtitle1={song.artist}
              subtitle2={`${song.album} (${song.year.split('-')[0]})`}
              image={song.image}
              uploadedImage={song.uploaded_image}
              album={song.album}
              spotifyUri={song.spotify_url}
            />
          </Grid>
          <Grid item xs={12} lg={3}>
            <NavRow item={song} objectType="songs"/>
          </Grid>
          <Grid item xs={12}>
            <Features objectType="song" song={song} />
            <SongSections song={song}/>
            {song.spotify_url
              ? <AudioProperties song={song} />
              : null }
            <Lyrics lyrics={song.lyrics} />
          </Grid>
        </Grid>
        <DeleteDialog item={song} deleteFunction={deleteSong} open={open} setOpen={setOpen} message1="Are you sure you want to delete this song?" message2="By deleting this song you will also delete all affiliated sections."/>
      </Paper>
    </Slide>
      )
    : null
}

export default React.memo(SongDetail)
