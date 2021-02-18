import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { Switch, useHistory, useLocation } from 'react-router-dom'

import filter_arrow_right from '../../assets/filter_arrow_right.svg'
import useHeight from '../../hooks/useHeight'
import PrivateRoute from '../auth/PrivateRoute'
import FilterControl from '../sharedComponents/FilterControl'
import NoMusicMessage from '../ui/NoMusicMessage'
import SectionCreate from './SectionCreate'
import SectionDetail from './SectionDetail'
import SectionDrawer from './SectionDrawer'
import SectionEdit from './SectionEdit'
import SectionList from './SectionList'

const drawerWidth = 244
const transitionDuration = 50

const useStyles = makeStyles((theme) => ({

  addIconContainer: {
    height: 72,
    width: 72,
    marginLeft: 0,
    position: 'fixed',
    top: '10%',
    zIndex: 3,
    right: '1%',
    '&:hover': {
      background: theme.palette.background.default
    },
    [theme.breakpoints.down('md')]: {
      top: '7%'
    }
  },

  cardGrid: {
    minHeight: '100vh',
    position: 'relative',
    marginTop: 50

  },

  detail: {
    height: '100%',
    minHeight: '120vh',
    marginTop: 107,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })
  },

  drawer: {
    width: drawerWidth,
    height: '100%',
    flexShrink: 0,
    marginTop: theme.spacing(9),
    overflowY: 'scroll',
    background: theme.palette.common.gray,
    [theme.breakpoints.down('md')]: {
      zIndex: theme.zIndex.modal + 1
    }
  },

  drawerIcon: {
    height: 54,
    width: 54,
    [theme.breakpoints.down('md')]: {
      height: 48,
      width: 48
    }
  },

  drawerIconContainer: {
    height: 72,
    width: 72,
    marginLeft: 0,
    position: 'fixed',
    top: '10%',
    zIndex: 3,
    left: '1%',
    '&:hover': {
      background: theme.palette.background.default
    },

    [theme.breakpoints.down('md')]: {
      top: '7%'
    }

  },

  list: {
    marginTop: 7,
    minHeight: '93vh',
    overflow: 'scroll',
    flexGrow: 1,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })

  },

  listSectionAlone: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),
    marginLeft: 46
  },

  listShiftSection: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })
  },

  listShiftRight: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),
    marginLeft: 290
  },

  listShiftLeft: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),

    marginLeft: 244
  }

}))

const SectionContainer = () => {
  const sections = useSelector((state) => state.sections, shallowEqual)
  const location = useLocation()
  const history = useHistory()

  const theme = useTheme()
  const classes = useStyles()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const medScreen = useMediaQuery(theme.breakpoints.down('md'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)
  const elementDOM = useRef(null)
  const [height] = useHeight(elementDOM)
  const [listColumnSize, setListColumnSize] = useState(8)
  const detailShow = location.pathname.includes('/sections/')

  useEffect(() => {
    setListColumnSize(8)
    if (detailShow) {
      setListColumnSize(3)
    }
  }, [detailShow])

  const renderFilter = () => {
    return Object.values(sections).length > 0 ? <FilterControl setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} objectType='sections' /> : null
  }

  const renderList = () => {
    return !smallScreen
      ? <>
          <Grid
              item xs={3} md={listColumnSize}
              className={clsx(classes.list, {
                [classes.listShiftRight]: openDrawer && !medScreen && !detailShow,
                [classes.listShiftLeft]: detailShow && openDrawer,
                [classes.listShiftSection]: listColumnSize !== 8 && detailShow && !openDrawer,
                [classes.listSectionAlone]: (!detailShow || listColumnSize === 8) && !openDrawer
              })}
          >
           <SectionList
             transitionDuration={transitionDuration}
             listColumnSize={listColumnSize}
             setListColumnSize={setListColumnSize}
             height={height}
           />
          </Grid>
        </>
      : <SectionDrawer openFilter={openDrawer} setOpenFilter={setOpenDrawer}/>
  }

  return (
    <div className={classes.root}>
     {Object.values(sections).length && !smallScreen
       ? <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
          <img src={filter_arrow_right} alt='filter-open-button' className={classes.drawerIcon}/>
      </IconButton>
       : null }
      {location.pathname !== '/sections/new' && !smallScreen
        ? <IconButton
          onClick={() => history.push('/sections/new')}
          className={classes.addIconContainer}
        >
          <AddRoundedIcon className={classes.drawerIcon}/>
        </IconButton>
        : null
      }
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        variant="persistent"
        anchor="left"
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        {renderFilter()}
      </SwipeableDrawer>
      <Grid container justify='space-evenly' className={classes.cardGrid}>
        {Object.values(sections).length
          ? renderList()
          : <NoMusicMessage objectType="sections"/> }
      {detailShow
        ? <Grid item xs={12} md={6} lg={6} ref={elementDOM} className={classes.detail}>
          <Switch>
            <PrivateRoute exact path="/sections/new" comp={SectionCreate} />
            <PrivateRoute exact path="/sections/:id" comp={SectionDetail} />
            <PrivateRoute exact path="/sections/edit/:id" comp={SectionEdit}/>
          </Switch>
        </Grid>
        : null }
      </Grid>
    </div>
  )
}

export default React.memo(SectionContainer)
