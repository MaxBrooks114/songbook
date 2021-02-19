import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { useTheme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import InstrumentCard from './InstrumentCard'

let transitionDuration = 50

const useStyles = makeStyles((theme) => ({

  addIcon: {
    height: 32,
    width: 32
  },

  addIconContainer: {
    height: 32,
    width: 32,
    '&:hover': {
      background: theme.palette.background.default
    }
  },

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
    width: '93%',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  title: {
    fontWeight: 600,
    display: 'inline',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  },

  titleBar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

}))

const InstrumentList = ({ listColumnSize, setListColumnSize, height }) => {
  const instruments = useSelector(state => state.instruments)
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

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
         <div className={classes.titleBar}>
          <Typography variant="h5" className={classes.title}>
           Instruments
          </Typography>
          { location.pathname !== '/instruments/new' && !smallScreen
            ? <Tooltip title="Add Instrument">
                <IconButton
                  onClick={() => history.push('/instruments/new')}
                  className={classes.addIconContainer}
                >
                  <AddRoundedIcon className={classes.addIcon}/>
                </IconButton>
              </Tooltip>
            : null
            }
        </div>
        <div className={classes.sortBar}>
          { listColumnSize === 3
            ? <Tooltip title="Expand list">
              <IconButton
                  className={classes.addIconContainer}
                  onClick={() => {
                    setListColumnSize(8)
                    history.push('/instruments')
                  }}>
                  <NavigateNextIcon className={classes.expand} />
                </IconButton>
              </Tooltip>
            : null
          }
        </div>
        <List className={classes.list} style={{ height: height }}>
          {renderedList()}
        </List>
      </>
  )
}

export default InstrumentList
