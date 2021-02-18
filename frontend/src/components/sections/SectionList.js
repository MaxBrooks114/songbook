import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {FixedSizeList} from 'react-window'
import { getFilteredItems } from '../../selectors/filterSelectors'
import Sort from '../sharedComponents/Sort'
import SongAccordion from './SongAccordion'

const useStyles = makeStyles((theme) => ({

 

  list: {
    paddingTop: 0,
    height: '80%',
    overflow: 'scroll',
    borderRadius: 4

  },

  sortBar: {
    width: '95%',
    display: 'flex',
    justifyContent: 'flex-end'
  },

  title: {
    width: '95%',
    fontWeight: 600,
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      width: '100%'
    }
  }

}))
const SectionList = ({ listColumnSize, setListColumnSize, transitionDuration, height }) => {
  const filteredSections = useSelector((state) => getFilteredItems(state, 'sections'), shallowEqual)
   
  const songs = useSelector((state) => state.songs, shallowEqual)
  const filter = useSelector((state) => state.filter)
  const order = filter.order === 'ascending' ? [1, -1] : [-1, 1]
  const orderedSongs = filter.sort === 'song'
    ? Object.values(songs).sort((a, b) => (a.title > b.title ? order[0] : order[1]))
    : Object.values(songs)
  const listLength = orderedSongs.length
  const classes = useStyles()
  const history = useHistory()

 

 const Row =  ({index, style}) => (


    <div style={style} >
      <SongAccordion 
        
        key={orderedSongs[index].id} 
        song={orderedSongs[index]} 
        transitionDuration={transitionDuration}
        sections={filteredSections.filter(section => orderedSongs[index].id === section.song.id)} />
      </div>
    )
     

  return (
      <>
        <Typography variant="h5" className={classes.title}>
          Sections
        </Typography>
        <div className={classes.sortBar}>
          <Sort objectType='sections'/>
          {listColumnSize === 3
            ? <IconButton
                onClick={() => {
                  setListColumnSize(8)
                  history.push('/sections')
                }}>
                <NavigateNextIcon />
              </IconButton>
            : null}
        </div>
        <FixedSizeList itemSize={130} itemCount={listLength} className={classes.list} height={height || 800}>
          {Row}
        </FixedSizeList>
      </>
  )
}

export default React.memo(SectionList)
