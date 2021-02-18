import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import DetailAccordion from '../sharedComponents/DetailAccordion'

const useStyles = makeStyles((theme) => ({

  accordion: {
    background: theme.palette.primary.light,
    color: theme.palette.info.main,
    borderRadius: 4,
    margin: '1rem 0',
    '& .MuiAccordionSummary-content': {
      flexGrow: 0
    },

    '& .MuiAccordionSummary-root': {
      justifyContent: 'space-between',
      padding: '0, 16'
    },

    '& .MuiAccordionDetails-root': {
      padding: 0,
      marginBottom: theme.spacing(2)
    },

    '& .MuiGrid-grid-xs-10': {
      margin: 0,
      justifyContent: 'center'
    }
  },

  accordionTitle: {
    fontWeight: '500'
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.common.darkGreen
    }
  }

}))

const SectionInstruments = ({ section }) => {
  const instruments = useSelector((state) =>
    Object.values(state.instruments).filter((instrument) => section.instruments.includes(instrument.id)))
  const classes = useStyles()

  const renderInstruments = () => {
    return instruments.length
      ? instruments.map((instrument) => {
        return (
            <Grid item key={instrument.id} xs={2}>
              <Typography>
                <Link className={classes.link} to={`/instruments/${instrument.id}`}>{instrument.name}</Link>
              </Typography>
            </Grid>
        )
      })
      : null
  }

  return <DetailAccordion title="Instruments" renderFunction={renderInstruments} justify="center" />
}

export default SectionInstruments
