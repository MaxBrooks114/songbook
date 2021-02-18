import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { createFile } from '../../actions/files'
import { createSection } from '../../actions/sections'
import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { normalize } from '../../helpers/detailHelpers'
import SectionForm from './SectionForm'

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

const SectionCreate = () => {
  const dispatch = useDispatch()
  const songs = useSelector((state) => state.songs, shallowEqual)
  const instruments = useSelector((state) => state.instruments, shallowEqual)

  const songId = (title) => {
    const song = Object.values(songs).find((song) => song.title === title)
    return song.id
  }
  const onSubmit = (formValues) => {
    if (!formValues.tempo) {
      formValues.tempo = 0
    }
    dispatch(
      createSection({
        ...formValues,
        key: normalize(keys, formValues.key),
        mode: normalize(modes, formValues.mode),
        song: songId(formValues.song),
        duration: formValues.duration * 1000,
        start: formValues.start * 1000,
        learned: !!formValues.learned

      })
    )
    if (formValues.recording) {
      dispatch(createFile({ file: formValues.recording, extension: formValues.recording.name.split('.').slice(-1)[0], section: formValues.id, song: songId(formValues.song) }))
    }
    if (formValues.tab) {
      dispatch(createFile({ file: formValues.tab, extension: formValues.tab.name.split('.').slice(-1)[0], section: formValues.id, song: songId(formValues.song) }))
    }
  }

  const classes = useStyles()

  return songs
    ? (

      <div className={classes.root}>
        <Typography className={classes.title} variant="h2" align="center" >
          Create a Section
        </Typography>
        <Typography variant="subtitle2" align="center" gutterBottom>
          This is the manual way to create a section. Most useful for original songs, though you can add anything you want( it needs to be tied to a song). Just note you will not be able to use the Spotify player features.
        </Typography>
        <SectionForm songs={songs} instruments={instruments} onSubmit={onSubmit} />
      </div>

      )
    : <Redirect to="/songs/new"/>
}

export default SectionCreate
