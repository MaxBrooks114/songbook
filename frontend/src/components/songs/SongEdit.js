import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { editSong } from '../../actions/songs'
import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { normalize, renderText } from '../../helpers/detailHelpers'
import SongForm from './SongForm'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    width: '100%',
    margin: 'auto',
    padding: '2rem',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4

  },

  title: {
    fontSize: '2.8rem',
    fontWeight: 600,
    color: theme.palette.info.main

  }

}))

const SongEdit = () => {
  const params = useParams()
  const song = useSelector(state => state.songs[params.id])
  const initialValues = song ? { ...song, key: renderText(keys, song.key), mode: renderText(modes, song.mode) } : null
  const dispatch = useDispatch()
  const classes = useStyles()

  const onSubmit = (formValues) => {
    dispatch(
      editSong(song.id, {
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode)
      })
    )
  }

  return (
      <div className={classes.root}>
        <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
          Edit a Song
        </Typography>
        <SongForm initialValues={initialValues} onSubmit={onSubmit} />
      </div>
  )
}

export default SongEdit
