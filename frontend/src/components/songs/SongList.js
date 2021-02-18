import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {FixedSizeList} from 'react-window'
import { getFilteredItems } from '../../selectors/filterSelectors'
import Sort from '../sharedComponents/Sort'
import SongCard from './SongCard'


const useStyles = makeStyles((theme) => ({

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
    width: '95%',
    fontWeight: 600,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  },

  sortBar: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }

}))


const SongList = ({ listColumnSize, setListColumnSize, transitionDuration, height }) => {
  const filteredSongs = useSelector((state) => getFilteredItems(state, 'songs'), shallowEqual)
  const listLength = filteredSongs.length 
  const history = useHistory()
  const classes = useStyles()
  const Row =  ({index, style}) => (<ListItem
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
        <Typography variant="h5" className={classes.title}>
          Songs
        </Typography>
        <div className={classes.sortBar}>
         <Sort objectType='songs'/>
          {listColumnSize === 3
            ? <IconButton onClick={() => {
              setListColumnSize(8)
              history.push('/songs')
            }}>
            <NavigateNextIcon className={classes.expand} />
          </IconButton>
            : null}
        </div>
        <FixedSizeList itemSize={100} itemCount={parseInt(listLength)} className={classes.list} height={height || 600}>
            {Row}
        </FixedSizeList>
      </>
  )
}

export default React.memo(SongList)
