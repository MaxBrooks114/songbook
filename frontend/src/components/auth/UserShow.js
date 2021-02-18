import { useTheme } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'

import UserMetrics from './UserMetrics'

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.info.main,
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center'
    }
  },

  tab: {
    ...theme.typography.tab,
    marginLeft: '1.7rem',
    color: theme.palette.info.main,
    minWidth: 10,
    opacity: 1,
    alignText: 'left',
    [theme.breakpoints.down('md')]: {

      marginLeft: 'auto'
    }
  },

  title: {
    fontSize: '3rem',
    fontWeight: 600,
    display: 'block',
    marginLeft: '1.7rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
      margin: 'auto'
    }
  },

  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '4 rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em'
    }
  }

}))

const UserShow = () => {
  const songs = useSelector(state => state.songs)
  const sections = useSelector(state => state.sections)
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = useState(0)
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const menuOptions = [
    { name: 'Progress', link: 'progress', activeIndex: 0 },
    { name: 'Favorites', link: 'favorites', activeIndex: 1 },
    { name: 'Timing', link: 'timing', activeIndex: 2 },
    { name: 'Audio Preferences', link: 'audioPreferences', activeIndex: 3 }
  ]

  useEffect(() => {
    setValue(menuOptions.find(option => option.link === location.pathname.split('/').slice(-1)[0]).activeIndex)
  })

  const renderTabs = () => {
    return menuOptions.map(option => (
        <Tab key={option.activeIndex} label={option.name} onClick={() => history.push(option.link)} className={classes.tab}/>
    )
    )
  }
  return (
    <div className={classes.root}>
      <div className={classes.toolbarMargin}/>
      <Typography className={classes.title} component="p" variant="h3" gutterBottom>Library Statistics</Typography>

        {!smallScreen
          ? <Tabs
            value={value}
            onChange={(e, value) => setValue(value)}

            indicatorColor='secondary'
            >
              {renderTabs()}
          </Tabs>
          : <Carousel autoPlay={false}>{renderTabs()}</Carousel>}

      <UserMetrics songs={Object.values(songs)} sections={Object.values(sections)}/>
    </div>
  )
}

export default UserShow
