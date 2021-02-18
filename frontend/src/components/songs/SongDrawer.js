import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import filter_arrow_right from '../../assets/filter_arrow_right.svg'
import SongList from './SongList'

const useStyles = makeStyles((theme) => ({

  addIcon: {
    height: 42,
    width: 42
  },

  addIconContainer: {
    height: 24,
    width: 24,
    marginLeft: 0,
    position: 'fixed',
    bottom: '12%',
    zIndex: theme.zIndex.drawer + 1,
    right: '6%',

    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },

  drawer: {
    background: theme.palette.background.default,
    height: '85%',
    margin: 'auto',
    marginTop: theme.spacing(8)

  },

  drawerIcon: {
    height: 50,
    width: 50
  },

  drawerIconContainer: {
    backgroundColor: theme.palette.common.gray,
    height: 24,
    width: 24,
    marginLeft: 0,
    position: 'fixed',
    bottom: '25%',
    zIndex: theme.zIndex.drawer + 1,
    right: '6%',

    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },

  filterIcon: {
    height: 48,
    width: 48
  },

  filterIconContainer: {
    height: 24,
    width: 24,
    marginLeft: 0,
    position: 'fixed',
    bottom: '18%',
    zIndex: theme.zIndex.drawer + 1,
    right: '5%',

    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }

}))
const SongDrawer = ({ openFilter, setOpenFilter }) => {
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const [openDrawer, setOpenDrawer] = useState(false)
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const drawerButton = () => {
    return openDrawer ? <KeyboardArrowDownRoundedIcon onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon}/> : <KeyboardArrowUpRoundedIcon onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIcon}/>
  }
  return (
    <div>
      <IconButton className={classes.drawerIconContainer}>
        {drawerButton()}
      </IconButton>
      {!openFilter
        ? (
        <IconButton className={classes.filterIconContainer} onClick={() => setOpenFilter(true)}>
          <img className={classes.filterIcon} src={filter_arrow_right} alt="filter_button" />
        </IconButton>
          )
        : null }
      {!location.pathname.includes('new')
        ? (
        <IconButton onClick={() => history.push('/songs/new')} className={classes.addIconContainer}>
          <AddRoundedIcon className={classes.addIcon}/>
        </IconButton>
          )
        : null }
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        variant="persistent"
        anchor="bottom"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <SongList />
      </SwipeableDrawer>

    </div>
  )
}

export default SongDrawer
