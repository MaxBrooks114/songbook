import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import { makeStyles } from '@material-ui/styles'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch, useHistory, useLocation } from 'react-router-dom'

import useHeight from '../../hooks/useHeight'
import PrivateRoute from '../auth/PrivateRoute'
import NoMusicMessage from '../ui/NoMusicMessage'
import InstrumentCreate from './InstrumentCreate'
import InstrumentDetail from './InstrumentDetail'
import InstrumentDrawer from './InstrumentDrawer'
import InstrumentEdit from './InstrumentEdit'
import InstrumentList from './InstrumentList'

const transitionDuration = 50

const useStyles = makeStyles((theme) => ({

  addIcon: {
    height: 54,
    width: 54,

    [theme.breakpoints.down('md')]: {
      height: 36,
      width: 36
    }
  },
  addIconContainer: {
    height: 72,
    width: 72,
    marginLeft: 0,
    position: 'fixed',
    top: '12%',
    zIndex: 3,
    right: '1%',
    '&:hover': {
      background: theme.palette.background.default
    },
    [theme.breakpoints.down('sm')]: {
      top: '80%',
      right: 0
    }
  },

  cardGrid: {
    minHeight: '100vh',
    position: 'relative',
    marginTop: 50

  },

  detail: {
    height: '100%',
    minHeight: '100vh',
    marginTop: 99,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })
  },

  list: {
    marginTop: 7,
    minHeight: '100vh',
    flexGrow: 1,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })
  },

  listShiftAlone: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    }),

    marginLeft: 47
  },

  listShiftInstrument: {
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.easeOut,
      duration: 500
    })
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '.7rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem'
    }
  }

}))

const InstrumentContainer = () => {
  const instruments = useSelector((state) => state.instruments)
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const [listColumnSize, setListColumnSize] = useState(8)
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const elementDOM = useRef(null)
  const [height] = useHeight(elementDOM)
  const detailShow = location.pathname.includes('/instruments/')

  useEffect(() => {
    setListColumnSize(8)
    if (detailShow) {
      setListColumnSize(3)
    }
  }, [detailShow])

  const renderList = () => {
    return !smallScreen
      ? <Grid
          item xs={3} md={listColumnSize}
          className={clsx(classes.list, {
            [classes.listShiftInstrument]: listColumnSize !== 8 && detailShow,
            [classes.listShiftAlone]: !detailShow || listColumnSize === 8
          })
            }>
            <InstrumentList
              height={height}
              listColumnSize={listColumnSize}
              setListColumnSize={setListColumnSize}
              />
        </Grid>
      : <InstrumentDrawer transitionDuration={transitionDuration}/>
  }

  return (
    <>
       {location.pathname !== '/instruments/new' && !smallScreen
         ? <IconButton
          onClick={() => history.push('/instruments/new')}
          className={classes.addIconContainer}
        >
          <AddRoundedIcon className={classes.addIcon}/>
        </IconButton>
         : null
      }
      <Grid container justify='space-evenly' className={classes.cardGrid}>
        {Object.values(instruments).length
          ? renderList()
          : <NoMusicMessage objectType="instruments"/>

        }
        {detailShow
          ? <Grid item xs={12} md={6} ref={elementDOM} className={classes.detail}>
          <Switch>
            <PrivateRoute exact path="/instruments/new" comp={InstrumentCreate} />
            <PrivateRoute exact path="/instruments/:id" comp={InstrumentDetail} />
            <PrivateRoute exact path="/instruments/edit/:id" comp={InstrumentEdit}/>
          </Switch>
        </Grid>
          : null}

      </Grid>
    </>
  )
}

export default InstrumentContainer
