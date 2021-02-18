import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { editInstrument } from '../../actions/instruments'
import InstrumentForm from './InstrumentForm'

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

const InstrumentEdit = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const instrument = useSelector(state => state.instruments[params.id])
  const initialValues = instrument ? { ...instrument } : null

  const onSubmit = (formValues) => {
    dispatch(
      editInstrument(instrument.id, {
        ...formValues
      })
    )
  }

  const classes = useStyles()

  return (
      <div className={classes.root}>
        <Typography className={classes.title} component="h1" variant="h2" align="center" gutterBottom>
          Edit an Instrument
        </Typography>
        <InstrumentForm initialValues={initialValues} onSubmit={onSubmit} />
      </div>
  )
}

export default InstrumentEdit
