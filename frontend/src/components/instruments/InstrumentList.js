import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import InstrumentCard from './InstrumentCard'

let transitionDuration = 50

const useStyles = makeStyles((theme) => ({

  expand: {
    height: 32,
    width: 32
  },

  list: {
    paddingTop: 0,
    minHeight: '100vh',
    height: '80%',
    overflow: 'scroll',
    borderRadius: 4
  },

  listItem: {
    '&:hover': {
      transform: 'translate(10px, 10px)',
      transition: 'transform 0.2s ease 0s',
      cursor: 'pointer',
      zIndex: 2
    }

  },

  sortBar: {

    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  title: {
    width: '95%',
    fontWeight: '600',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  }

}))

const InstrumentList = ({ listColumnSize, setListColumnSize, height }) => {
  const instruments = useSelector(state => state.instruments)
  const history = useHistory()
  const classes = useStyles()

  const renderedList = () => {
    return Object.values(instruments).length > 0
      ? Object.values(instruments)
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .map((instrument) => {
          transitionDuration += 50
          return (
              <ListItem
                className={classes.listItem}
                key={instrument.id}
                onClick={() => {
                  history.push(`/instruments/${instrument.id}`)
                }}
                dense>
                <InstrumentCard
                  instrument={instrument}
                  transitionDuration={transitionDuration}
                />
              </ListItem>
          )
        })
      : null
  }

  return (
      <>
        <Typography variant="h5" className={classes.title}>
         Instruments
        </Typography>
        <div className={classes.sortBar}>
          {listColumnSize === 3
            ? <IconButton onClick={() => {
              setListColumnSize(8)
              history.push('/instruments')
            }}>
            <NavigateNextIcon className={classes.expand} />
          </IconButton>
            : null}
        </div>
        <List className={classes.list} style={{ height: height }}>
          {renderedList()}
        </List>
      </>
  )
}

export default InstrumentList
