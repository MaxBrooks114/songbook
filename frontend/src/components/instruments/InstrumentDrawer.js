import IconButton from '@material-ui/core/IconButton'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@material-ui/icons/KeyboardArrowUpRounded'
import { makeStyles } from '@material-ui/styles'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import InstrumentList from './InstrumentList'

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
    bottom: '18%',
    zIndex: theme.zIndex.drawer + 1,
    right: '6%',

    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  }

}))

const InstrumentDrawer = () => {
  const location = useLocation()
  const history = useHistory()
  const [openDrawer, setOpenDrawer] = useState(false)
  const classes = useStyles()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

  const drawerButton = () => {
    return openDrawer ? <KeyboardArrowDownRoundedIcon className={classes.drawerIcon}/> : <KeyboardArrowUpRoundedIcon className={classes.drawerIcon}/>
  }
  return (
    <div>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
        {drawerButton()}
      </IconButton>
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
        <InstrumentList />
      </SwipeableDrawer>

    </div>
  )
}

export default InstrumentDrawer
