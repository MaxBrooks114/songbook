import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { SET_FILTER } from '../../actions/types'

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.primary.main,
    color: 'black',
    height: '85%',
    width: '85%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0px 3px 15px rgba(0,0,0,0.2)',
    alignItems: 'flex-start',
    position: 'relative',
    '&:hover': {
      transform: 'translate(10px, 10px)',
      transition: 'transform 0.2s ease 0s',
      cursor: 'pointer',
      zIndex: 2
    }
  },

  cardContent1: {
    color: theme.palette.info.main,
    padding: 10,
    height: 80,
    [theme.breakpoints.down('sm')]: {
      height: 60
    }
  },

  cardContent2: {
    color: theme.palette.info.main,
    padding: 10,
    height: 120,
    [theme.breakpoints.down('sm')]: {
      height: 80
    }
  },

  link: {
    textDecoration: 'none',
    color: theme.palette.info.main
  },

  media: {
    width: '100%',
    borderRadius: 4
  },

  trackInfo: {
    fontWeight: '300',
    fontSize: '.8rem',
    color: theme.palette.info.main,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '1',
    overflow: 'hidden',
    whiteSpace: 'normal',
    [theme.breakpoints.down('sm')]: {
      lineClamp: '1'
    }
  },

  trackTitle: {
    fontWeight: '700',
    fontSize: '.8rem',
    color: theme.palette.info.main,
    boxOrient: 'vertical',
    display: '-webkit-box',
    lineClamp: '2',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal',
    [theme.breakpoints.down('sm')]: {
      lineClamp: '1'
    }
  }

}))

const ItemCard = ({ index, picture, album, cardTitle, cardInfo1, cardInfo2, type, id, dispatchKey, dispatchValue }) => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  return (
      <Card className={classes.root} onClick={() => {
        history.push(`/${type}/${id}`)
        if (dispatchKey && (dispatchValue || dispatchValue === 0)) {
          dispatch({
            type: SET_FILTER,
            payload: {

              [dispatchKey]: dispatchValue, filter: true
            }
          })
        }
      }}>
        <CardMedia
        ><img className={classes.media} alt={album} src={picture}/></CardMedia>
        <div className={classes.cardBody}>
        <CardContent className={classes.cardContent1}>
              <Typography variant="h6">{index + 1}</Typography>
              <Typography className={classes.trackTitle} variant="subtitle1">
                {cardTitle}< br/>
              </Typography>
        </CardContent>

        <CardContent className={classes.cardContent2}>
          <Typography component="p" className={classes.trackInfo} variant="subtitle2">
           {cardInfo1} </Typography>
          <Typography component="p" className={classes.trackInfo} variant="subtitle2">
           {cardInfo2} </Typography>

        </CardContent>
        </div>
      </Card>
  )
}

export default ItemCard
