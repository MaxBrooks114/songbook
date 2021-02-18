import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Toolbar from '@material-ui/core/Toolbar'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink, useLocation } from 'react-router-dom'

import logo from '../../assets/logo.png'
import SpotifySearchBar from '../spotify/SpotifySearchBar'

const useStyles = makeStyles((theme) => ({

  appBar: {
    background: theme.palette.common.gray,
    zIndex: theme.zIndex.modal + 2
  },

  drawer: {
    background: theme.palette.common.gray,
    display: 'flex',
    alignItems: 'flex-start',
    color: theme.palette.info.main,
    '& .PrivateSwipeArea-anchorLeft-24': {
      width: '0px !important'
    }
  },

  drawerIcon: {
    height: 50,
    width: 50
  },

  drawerIconContainer: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },

  drawerItem: {
    color: theme.palette.info.main,
    minWidth: 10,
    opacity: 1
  },

  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1
    }
  },

  listButton: {
    ...theme.button
  },

  logo: {
    color: theme.palette.secondary.main,
    verticalAlign: 'top',
    marginBottom: 10,
    marginLeft: 16,
    height: '3.5rem',
    [theme.breakpoints.down('md')]: {
      height: '3rem'
    }
  },

  menu: {
    backgroundColor: theme.palette.common.gray,
    color: theme.palette.info.main

  },

  menuItem: {
    ...theme.typography.tab,
    font: 'bold',
    justifyContent: 'center'

  },

  profileIcon: {
    height: 36,
    width: 36
  },

  progressbar: {
    marginTop: 14,
    [theme.breakpoints.down('md')]: {
      marginTop: 8
    }
  },

  tab: {
    ...theme.typography.tab,
    marginLeft: '2rem',
    color: theme.palette.info.main,
    minWidth: 10,
    opacity: 1,
    alignText: 'left'
  },

  tabContainer: {
    marginLeft: 'auto'
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      marginBottom: '.5rem'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1rem'
    }
  }
}))

function ElevationScroll (props) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  })
}

const Navbar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const matches = useMediaQuery(theme.breakpoints.down('md'))
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const [openDrawer, setOpenDrawer] = useState(false)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const user = useSelector((state) => state.auth.user)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [open, setOpen] = React.useState(false)
  const location = useLocation()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen(true)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null)
    setOpen(false)
    setSelectedIndex(i)
  }
  const menuOptions = user
    ? [
        { name: 'Songs', link: '/songs', activeIndex: 0, selectedIndex: 0 },
        { name: 'New Song', link: '/songs/new', activeIndex: 0, selectedIndex: 1 },
        { name: 'Sections', link: '/sections', activeIndex: 1, selectedIndex: 2 },
        { name: 'New Section', link: '/sections/new', activeIndex: 1, selectedIndex: 3 },
        { name: 'Instruments', link: '/instruments', activeIndex: 1, selectedIndex: 4 },
        { name: 'New Instrument', link: '/instruments/new', activeIndex: 1, selectedIndex: 5 },
        { name: 'Statistics', link: `/users/${user.id}/progress`, activeIndex: 2, selectedIndex: 6 },
        { name: 'Manage Account', link: `/users/${user.id}/edit`, activeIndex: 2, selectedIndex: 7 },
        { name: 'Log out', link: '/logout', activeIndex: 2, selectedIndex: 8 }
      ]
    : [
        { name: 'Register', link: '/register', activeIndex: 0 },
        { name: 'Log In', link: '/login', activeIndex: 1 }
      ]

  const authRoutes = user

    ? [
        { name: 'Songs', link: '/songs', activeIndex: 0 },
        { name: 'Sections', link: '/sections', activeIndex: 1 },
        { name: user.username, link: `/users/${user.id}`, activeIndex: 2 }
      ]
    : null

  const guestRoutes = [
    { name: 'Register', link: '/register', activeIndex: 0 },
    { name: 'Log In', link: '/login', activeIndex: 1 }
  ]

  const routes = isAuthenticated && user ? authRoutes : guestRoutes

  const activeIndex = () => {
    const found = routes.find(({ link }) => link === location.pathname)
    const menuFound = menuOptions.find(({ link }) => link === location.pathname)

    if (menuFound) {
      setValue(menuFound.activeIndex)
      setSelectedIndex(menuFound.selectedIndex)
    } else if (!menuFound && !found) {
      setValue(false)
    } else {
      setValue(menuFound.activeIndex)
    }
  }

  useEffect(() => {
    activeIndex()
  })

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        value={value}
        onChange={(e, value) => setValue(value)}
        indicatorColor={location.pathname === '/search' || location.pathname === '/' ? '' : 'secondary'}
      >

        {routes.map((route) => (
          route.link.includes('user')
            ? <IconButton
            key={`${route.name}${route.activeIndex}`}
            className={classes.tab}
            component={RouterLink}
            onMouseOver={e => handleClick(e)}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup={anchorEl ? 'true' : undefined}
            to={route.link}
            tabIndex={route.activeIndex}
            label={route.name}><AccountCircleIcon className={classes.profileIcon}/></IconButton>
            : <Tab
            tabIndex={route.activeIndex}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup={anchorEl ? 'true' : undefined}
            onMouseOver={e => handleClick(e)}
            key={`${route.name}${route.activeIndex}`}
            className={classes.tab}
            component={RouterLink}
            to={route.link}
            label={route.name}
          />
        ))}
      </Tabs>
    </>
  )

  const drawer = (
    <>
      <SwipeableDrawer
        classes={{ paper: classes.drawer }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {menuOptions.map((route) => (
            <ListItem
              key={`${route.name}${route.activeIndex}`}
              onClick={() => {
                setOpenDrawer(false)
                setValue(route.activeIndex)
                setSelectedIndex(route.selectedIndex)
              }}
              divider
              button
              component={RouterLink}
              to={route.link}
              classes={{ selected: classes.drawerItemSelected }}
              selected={selectedIndex === route.selectedIndex}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          {user ? <SpotifySearchBar showButton={false}/> : null }
        </List>
      </SwipeableDrawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)} className={classes.drawerIconContainer}>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  )
  return (
    <>
     <ElevationScroll>
      <AppBar className={classes.appBar} position="fixed" elevation={0}>
        <Toolbar disableGutters>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={4}>
           <Button component={RouterLink} to="/" >
              <img alt="logo" src={logo} variant="h6" className={classes.logo}/>
            </Button>
            </Grid>
            { matches
              ? null
              : <Grid item xs={4} >
                {location.pathname === '/search' || !user ? null : <div><SpotifySearchBar showButton={false}/></div>}
            </Grid>}
                {matches ? drawer : tabs}
            {user
              ? <Menu
                elevation={0}
                style={{ zIndex: 1302 }}
                classes={{ paper: classes.menu }}
                MenuListProps={{ onMouseLeave: handleClose }}
                id="simple-menu"
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={open}
                onClose={handleClose}>
                {menuOptions && anchorEl
                  ? menuOptions.filter(option => option.activeIndex === anchorEl.tabIndex).map((option, i) => (
                  <MenuItem
                    key={option.name}
                    classes={{ root: classes.menuItem }}
                    onClick={(e, i) => { handleMenuItemClick(e, i); handleClose() }}
                    component={RouterLink}
                    to={option.link}>
                    {option.name}
                  </MenuItem>
                  ))
                  : null}
              </Menu>
              : null}
            </Grid>
        </Toolbar>

      </AppBar>

      </ElevationScroll>
      <div className={classes.toolbarMargin}/>

    </>

  )
}

export default Navbar
