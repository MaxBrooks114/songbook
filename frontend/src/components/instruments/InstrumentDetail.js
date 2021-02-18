
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import Slide from '@material-ui/core/Slide'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { deleteInstrument } from '../../actions/instruments'
import DeleteDialog from '../sharedComponents/DeleteDialog'
import Features from '../sharedComponents/Features'
import VertMenu from '../sharedComponents/VertMenu'
import InstrumentSections from './InstrumentSections'

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
    top: 18
  },

  title: {
    fontWeight: 600
  },

  titleContainer: {
    textAlign: 'center'
  }

}))

const InstrumentDetail = () => {
  const params = useParams()
  const instrument = useSelector(state => state.instruments[params.id])
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const popped = Boolean(anchorEl)
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return instrument
    ? (
    <Slide direction="up" mountOnEnter unmountOnExit in transition={150}>
      <Paper className={classes.root} elevation={3}>
        <Grid container alignItems="center" justify="center" className={classes.details}>
            <IconButton
              className={classes.vert}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleMenuClick(event)}
            >
              <MoreVertRoundedIcon />
            </IconButton>
            <VertMenu
              instrument={instrument}
              objectType="instruments"
              popped={popped}
              anchorEl={anchorEl}
              setAnchorEl={setAnchorEl}
              setOpen={setOpen}
            />
            <Grid item xs={8} className={classes.titleContainer}>
              <Typography variant={matches ? 'h6' : 'h5'} className={classes.title}>{instrument.name}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
              <Features instrument={instrument} objectType='instrument'/>
              <InstrumentSections instrument={instrument} />
          </Grid>
        <DeleteDialog item={instrument} deleteFunction={deleteInstrument} open={open} setOpen={setOpen} message1="Are you sure you want to delete this isntrument?" message2=" By deleting this instrument you will also lose any affiliation with the sections you have listed for this instrument."/>
      </Paper>
    </Slide>
      )
    : null
}

export default InstrumentDetail
