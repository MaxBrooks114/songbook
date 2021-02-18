import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Slide from '@material-ui/core/Slide'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    display: 'block',
    width: '95%',
    height: 85,
    margin: 'auto',
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

const SectionCard = ({ section, transitionDuration }) => {
  const classes = useStyles()

  return (
    <Slide direction="up" mountOnEnter in timeout={transitionDuration}>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} variant="subtitle1">{section.name}</Typography>
        </CardContent>
      </Card>
    </Slide>
  )
}

export default React.memo(SectionCard)
