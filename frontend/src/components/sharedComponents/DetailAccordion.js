import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

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
      justifyContent: 'space-between'
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
    fontWeight: 500,
    [theme.breakpoints.down('md')]: {
      maxWidth: 200
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: 180
    },
    [theme.breakpoints.down('xs')]: {
      maxWidth: 120
    }

  }

}))

const DetailAccordion = ({ title, renderFunction, justify }) => {
  const classes = useStyles()

  return (
      <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography noWrap className={classes.accordionTitle}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container justify={justify} alignItems="center">
          {renderFunction()}
        </Grid>
      </AccordionDetails>
    </Accordion>
  )
}

export default DetailAccordion
