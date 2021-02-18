import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
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
    color: theme.palette.info.main,
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },

  cardContent: {
    marginTop: 'auto',
    marginLeft: '.6rem'
  },

  media: {
    width: 85,
    height: 85,
    objectFit: 'fill',
    borderRadius: 4,
    [theme.breakpoints.down('md')]: {
      width: 0
    },
    [theme.breakpoints.down('sm')]: {
      width: 85,
      objectFit: 'contain'
    },
    [theme.breakpoints.down('sm')]: {
      width: 0

    }
  },

  title: {
    fontWeight: 600
  }
}))

const SongCard = ({ song }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Slide direction="up" mountOnEnter in >
      <Card className={classes.root} >
        <CardMedia>
           <img
                  alt={song.album}
                  className={classes.media}
                  // always try to load imported album artwork before uploaded
                  src={song.image ? song.image : song.uploaded_image}
                />

        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.title} variant={matches ? 'caption' : 'subtitle2'}>
            {song.title}
          </Typography>
          <Typography variant="caption">
            {song.artist}
          </Typography>
        </CardContent>
      </Card>
    </Slide>
  )
}

export default SongCard
