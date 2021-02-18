import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles((theme) => ({

  desc: {
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '.6rem'
    }
  },

  subtitle: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem'
    }
  },

  title: {
    fontSize: '1.8rem',
    fontWeight: 600,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.6rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.4rem'
    }
  },

  video: {
    outline: 'none',
    borderRadius: 4,
    width: '100%',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)'

  }

}))

const Blurb = ({ blurb }) => {
  const classes = useStyles()
  return (
   <Grid container justify="space-around" alignItems="center">
      <Grid item xs={10} lg={6}>
        <Typography variant='h3' className={classes.title} gutterBottom>{blurb.title}</Typography>
        <Typography variant='h4' className={classes.subtitle} gutterBottom>{blurb.subtitle}</Typography>
        <Typography variant='subtitle1' className={classes.desc}gutterBottom>{blurb.desc}
        </Typography>
      </Grid>
      <Grid item xs={10} lg={5}>
        <video className={classes.video} autoPlay={true} preload="auto" loop src={blurb.video}/>
      </Grid>
  </Grid>
  )
}

export default Blurb
