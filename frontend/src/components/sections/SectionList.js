import IconButton from '@material-ui/core/IconButton'
import { useTheme } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddRoundedIcon from '@material-ui/icons/AddRounded'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { VariableSizeList } from 'react-window'

import { getFilteredItems } from '../../selectors/filterSelectors'
import Sort from '../sharedComponents/Sort'
import SongAccordion from './SongAccordion'

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
    height: '80%',
    overflow: 'scroll',
    borderRadius: 4

  },

  sortBar: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
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
const SectionList = ({ listColumnSize, setListColumnSize }) => {
  const filteredSections = useSelector((state) => getFilteredItems(state, 'sections'), shallowEqual)

  const songs = useSelector((state) => state.songs, shallowEqual)
  const filter = useSelector((state) => state.filter)
  const order = filter.order === 'ascending' ? [1, -1] : [-1, 1]
  const orderedSongs = filter.sort === 'song'
    ? _.uniqBy(filteredSections.map(section => section.song), 'id').sort((a, b) => (a.title > b.title ? order[0] : order[1]))
    : _.uniqBy(filteredSections.map(section => section.song), 'id')

  const listLength = orderedSongs.length
  const location = useLocation()
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const Row = ({ index, style }) => {
    const sections = filteredSections.filter(section => orderedSongs[index].id === section.song.id)
    return (
      orderedSongs[index] && sections.length
        ? (
          <div style={style}>
            <SongAccordion
              key={orderedSongs[index].id}
              song={orderedSongs[index]}
              sections={sections} />
          </div>)
        : null
    )
  }

  const getItemSize = index => {
    const rowHeights = new Array(orderedSongs.length)
      .fill(true)
      .map(() => 130)

    return rowHeights[index]
  }
  useEffect(() => {
    getItemSize()
  }, [orderedSongs, filteredSections])

  return (
      <>
        <div className={classes.titleBar}>
          <Typography variant="h5" className={classes.title}>
            Sections
          </Typography>
          { location.pathname !== '/sections/new' && !smallScreen
            ? <Tooltip title="Add Section">
                <IconButton
                  onClick={() => history.push('/sections/new')}
                  className={classes.addIconContainer}
                >
                  <AddRoundedIcon className={classes.addIcon}/>
                </IconButton>
              </Tooltip>
            : null
            }
        </div>
        <div className={classes.sortBar}>
         <Sort objectType='sections'/>

          { listColumnSize === 3
            ? <Tooltip title="Expand list">
              <IconButton
                  className={classes.addIconContainer}
                  onClick={() => {
                    setListColumnSize(8)
                    history.push('/sections')
                  }}>
                  <NavigateNextIcon className={classes.expand} />
                </IconButton>
              </Tooltip>
            : null
          }
        </div>
        <VariableSizeList itemSize={getItemSize} itemCount={parseInt(listLength)} className={classes.list} height={1000}>
          {Row}
        </VariableSizeList>
      </>
  )
}

export default React.memo(SectionList)
