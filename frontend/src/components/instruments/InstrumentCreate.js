import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'

import { createInstrument } from '../../actions/instruments'
import InstrumentForm from './InstrumentForm'

const useStyles = makeStyles((theme) => ({
  root: {

    color: theme.palette.info.main,
    margin: 'auto',
    width: '100%',
    padding: '2rem',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    backgroundColor: theme.palette.primary.main,
    borderRadius: 4

  },

  title: {
    fontSize: '2.8rem',
    fontWeight: 600,
    color: theme.palette.info.main,
    textAlign: 'center',
    width: '100%',
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    }
  }

}))

const InstrumentCreate = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const onSubmit = (formValues) => {
    dispatch(
      createInstrument({
        ...formValues,
        sections: []
      })
    )
  }

  return (
      <div className={classes.root}>
        <Typography className={classes.title} component="h1" variant="h2" align="center" >
          Add an Instrument
        </Typography>
         <Typography variant="subtitle2" align="center" gutterBottom>
            Adding an instrument let's you associate it with any section. If you are a multi-instrumentalist this is a good way to keep track of what section you know on which instrument.
          </Typography>
        <InstrumentForm onSubmit={onSubmit} />
      </div>
  )
}

export default InstrumentCreate
