import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'

import { createSong } from '../../actions/songs'
import keys from '../../dataToImport/keys'
import modes from '../../dataToImport/modes'
import { normalize } from '../../helpers/detailHelpers'
import SongForm from './SongForm'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
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

const SongCreate = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const onSubmit = (formValues) => {
    if (formValues.key) {
      formValues.key = normalize(keys, formValues.key)
    }
    if (formValues.mode) {
      formValues.mode = normalize(modes, formValues.mode)
    }

    dispatch(
      createSong({
        ...formValues,
        sections: []
      })
    )
  }

  return (
      <div className={classes.root}>
          <Typography className={classes.title} variant="h2" align="center" >
            Create a Song
          </Typography>
          <Typography variant="subtitle2" align="center" gutterBottom>
            This is the manual way to add a song. Most useful for original songs, you will not be able to use the Spotify Player feature using this method of song creation.
          </Typography>
          <SongForm onSubmit={onSubmit} />
    </div>
  )
}

export default SongCreate
