import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Slide from '@material-ui/core/Slide'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    display: 'flex',
    width: '95%',
    height: 85,
    paddingTop: 0,
    paddingBottom: 0,
    color: theme.palette.info.main,
    [theme.breakpoints.down('xs')]: {
      width: '100%'

    }

  },

  cardContent: {
    marginTop: 'auto',
    marginLeft: '.6rem'
  },

  title: {
    fontWeight: 600
  }

}))

const InstrumentCard = ({ instrument, transitionDuration }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const displayName = () => {
    return instrument.make && instrument.model
      ? <>{instrument.make} {instrument.model} ({instrument.name})</>
      : instrument.name
  }
  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.title} variant={matches ? 'subtitle2' : 'h6'}>
            {displayName()}
          </Typography>
        </CardContent>
      </Card>
    </Slide>
  )
}

export default InstrumentCard
