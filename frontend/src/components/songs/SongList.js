import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import { useTheme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { FixedSizeList } from 'react-window'

import { getFilteredItems } from '../../selectors/filterSelectors'
import Sort from '../sharedComponents/Sort'
import SongCard from './SongCard'

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
    height: '95%',
    overflow: 'scroll'

  },

  listItem: {

    '&:hover': {
      transform: 'translate(10px, 10px)',
      transition: 'transform 0.2s ease 0s',
      cursor: 'pointer',
      zIndex: 2
    }

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
  },

  sortBar: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }

}))

const SongList = ({ listColumnSize, setListColumnSize }) => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'), shallowEqual)
  const listLength = filteredSongs.length
  const history = useHistory()
  const location = useLocation()

  const classes = useStyles()
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const Row = ({ index, style }) => (<ListItem
                style={style}
                onClick={() => {
                  history.push(`/songs/${filteredSongs[index].id}`)
                }}
                className={classes.listItem}
                key={filteredSongs[index].id}
                disableGutters
                dense>
                <SongCard song={filteredSongs[index]} />
              </ListItem>
  )

  return (
      <>
        <div className={classes.titleBar}>
          <Typography variant="h5" className={classes.title}>
            Songs
          </Typography>
          { location.pathname !== '/songs/new' && !smallScreen
            ? <Tooltip title="Add Song">
                <IconButton
                  onClick={() => history.push('/songs/new')}
                  className={classes.addIconContainer}
                >
                  <AddRoundedIcon className={classes.addIcon}/>
                </IconButton>
              </Tooltip>
            : null
            }
        </div>
        <div className={classes.sortBar}>
         <Sort objectType='songs'/>

          { listColumnSize === 3
            ? <Tooltip title="Expand list">
              <IconButton
                  className={classes.addIconContainer}
                  onClick={() => {
                    setListColumnSize(8)
                    history.push('/songs')
                  }}>
                  <NavigateNextIcon className={classes.expand} />
                </IconButton>
              </Tooltip>
            : null
          }
        </div>
        <FixedSizeList itemSize={100} itemCount={parseInt(listLength)} className={classes.list} height={1000}>
            {Row}
        </FixedSizeList>
      </>
  )
}

export default React.memo(SongList)
