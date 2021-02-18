import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { createFile } from '../../actions/files'
import { editSection } from '../../actions/sections'
import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { normalize, renderText } from '../../helpers/detailHelpers'
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
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  }
}))

const SectionEdit = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const section = useSelector((state) => state.sections[params.id])
  const songs = useSelector((state) => state.songs)
  const instruments = useSelector((state) => state.instruments)
  const classes = useStyles()

  const songId = (title) => {
    const song = Object.values(songs).find((song) => song.title === title)
    return song.id
  }

  const renderTitle = () => {
    return section.song.title
  }

  const initialValues = section
    ? { ...section, start: section.start / 1000, duration: section.duration / 1000, key: renderText(keys, section.key), mode: renderText(modes, section.mode), song: renderTitle() }
    : null

  const onSubmit = (formValues) => {
    if (!formValues.tempo) {
      formValues.tempo = 0
    }
    dispatch(
      editSection(section.id, {
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

  return (
      <div className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
        Edit an Section
      </Typography>
      <SectionForm initialValues={initialValues} instruments={instruments} songs={songs} onSubmit={onSubmit} />
      </div>
  )
}

export default SectionEdit
