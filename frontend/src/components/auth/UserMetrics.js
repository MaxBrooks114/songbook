import Grid from '@material-ui/core/Grid'
import { useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/styles'
import _ from 'lodash'
import React from 'react'
import Carousel from 'react-material-ui-carousel'
import { useLocation } from 'react-router-dom'

import keys from '../../dataToImport/keys'
import { millisToMinutesAndSeconds, renderText, titleCase } from '../../helpers/detailHelpers'
import { attrPreference, bottomFive, topFive, topFiveByAttr, topFiveByAttrListLength } from '../../helpers/userMetricHelpers'
import NoMusicMessage from '../ui/NoMusicMessage'
import ItemCard from './ItemCard'

const useStyles = makeStyles((theme) => ({

  container: {
    margin: '25px auto 0'
  },

  graphic: {
    display: 'block',
    margin: '50px auto',
    width: 150,
    height: 310
  },

  message: {
    display: 'inline-block',
    margin: '0 auto',
    overflowWrap: 'normal'
  },

  rowTitle: {
    marginLeft: 29,
    marginBottom: '1rem',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      fontSize: '1rem'
    }
  }

}))

const UserMetrics = ({ songs, sections }) => {
  const classes = useStyles()
  const location = useLocation()
  const whichData = location.pathname.split('/').slice(-1)[0]
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))
  const spotifySongs = songs.filter(song => song.spotify_url)

  const data = {
    progress: {
      recentlyAddedSongs: [topFive(songs, 'created_at'), 'image', 'album', 'songs', 'title', 'artist', 'created_at', songs.length],
      recentlyAddedSections: [topFive(sections, 'created_at'), ['song', 'image'], ['song', 'album'], 'sections', 'name', ['song', 'title'], 'created_at', sections.length],
      recentlyUpdatedSongs: [topFive(songs, 'updated_at'), 'image', 'album', 'songs', 'title', 'artist', 'updated_at', songs.length],
      recentlyUpdatedSections: [topFive(sections, 'updated_at'), ['song', 'image'], ['song', 'album'], 'sections', 'name', ['song', 'title'], 'updated_at', sections.length],
      recentlyLearnedSections: [sections.sort((a, b) => a.created_at > b.created_at ? 1 : -1).filter(section => section.learned).slice(0, 5), ['song', 'image'], ['song', 'album'], 'sections', 'name', ['song', 'title'], 'created_at', `${sections.filter(section => section.learned).length}/${sections.length}`]
    },

    favorites: {
      favoriteArtists: [topFiveByAttr(songs, 'artist'), 'image', 'album', 'songs', 'artist', 'title', 'album', _.uniq(songs.map(song => song.artist)).length, topFiveByAttrListLength(songs, 'artist')],
      favoriteGenres: [topFiveByAttr(songs.filter(song => song.genre), 'genre'), 'image', 'album', 'songs', 'genre', 'title', 'artist', _.uniq(songs.filter(song => song.genre).map(song => song.genre)).length, topFiveByAttrListLength(songs.filter(song => song.genre), 'genre')],
      favoriteKeys: [topFiveByAttr(songs.filter(song => song.key !== null && song.key !== ''), 'key'), 'image', 'album', 'songs', 'key', 'artist', 'album', _.uniq(songs.map(song => song.key)).length, topFiveByAttrListLength(songs, 'key')],
      favoriteAlbums: [topFiveByAttr(songs.filter(song => song.album), 'album'), 'image', 'album', 'songs', 'album', 'title', 'artist', _.uniq(songs.map(song => song.album)).length, topFiveByAttrListLength(songs, 'album')]
    },

    timing: {
      fastestSongs: [topFive(songs, 'tempo'), 'image', 'album', 'songs', 'tempo', 'title', 'artist'],
      slowestSongs: [bottomFive(songs, 'tempo'), 'image', 'album', 'songs', 'tempo', 'title', 'artist'],
      longestSongs: [topFive(songs, 'duration'), 'image', 'album', 'songs', 'duration', 'title', 'artist'],
      shortestSongs: [bottomFive(songs, 'duration'), 'image', 'album', 'songs', 'duration', 'title', 'artist'],
      fastestSections: [topFive(sections, 'tempo'), ['song', 'image'], ['song', 'album'], 'sections', 'tempo', 'name', ['song', 'title']],
      slowestSections: [bottomFive(sections, 'tempo'), ['song', 'image'], ['song', 'album'], 'sections', 'tempo', 'name', ['song', 'title']],
      longestSections: [topFive(sections, 'duration'), ['song', 'image'], ['song', 'album'], 'sections', 'duration', 'name', ['song', 'title']],
      shortestSections: [bottomFive(sections, 'duration'), ['song', 'image'], ['song', 'album'], 'sections', 'duration', 'name', ['song', 'title']]
    },

    audioPreferences: {
      HighestValence: [topFive(spotifySongs, 'valence'), 'image', 'album', 'songs', 'valence', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'valence')}`],
      HighestEnergy: [topFive(spotifySongs, 'energy'), 'image', 'album', 'songs', 'energy', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'energy')}`],
      HighestInstrumentalness: [topFive(spotifySongs, 'instrumentalness'), 'image', 'album', 'songs', 'instrumentalness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'instrumentalness')}`],
      HighestAcousticness: [topFive(spotifySongs, 'acousticness'), 'image', 'album', 'songs', 'acousticness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'accousticness')}`],
      HighestDanceability: [topFive(spotifySongs, 'danceability'), 'image', 'album', 'songs', 'danceability', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'danceability')}`],
      HighestSpeechiness: [topFive(spotifySongs, 'speechiness'), 'image', 'album', 'songs', 'speechiness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'speechiness')}`],
      HighestLiveness: [topFive(spotifySongs, 'liveness'), 'image', 'album', 'songs', 'liveness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'liveness')}`],
      Loudest: [topFive(spotifySongs, 'loudness'), 'image', 'album', 'songs', 'loudness', 'title', 'artist'],
      LowestValence: [bottomFive(spotifySongs, 'valence'), 'image', 'album', 'songs', 'valence', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'valence')}`],
      LowestEnergy: [bottomFive(spotifySongs, 'energy'), 'image', 'album', 'songs', 'energy', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'energy')}`],
      LowestInstrumentalness: [bottomFive(spotifySongs, 'instrumentalness'), 'image', 'album', 'songs', 'instrumentalness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'instrumentalness')}`],
      LowestAcousticness: [bottomFive(spotifySongs, 'acousticness'), 'image', 'album', 'songs', 'acousticness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'acousticness')}`],
      LowestDanceability: [bottomFive(spotifySongs, 'danceability'), 'image', 'album', 'songs', 'danceability', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'danceability')}`],
      LowestSpeechiness: [bottomFive(spotifySongs, 'speechiness'), 'image', 'album', 'songs', 'speechiness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'speechiness')}`],
      LowestLiveness: [bottomFive(spotifySongs, 'liveness'), 'image', 'album', 'songs', 'liveness', 'title', 'artist', `preference: ${attrPreference(spotifySongs, 'liveness')}`],
      Softest: [bottomFive(spotifySongs, 'loudness'), 'image', 'album', 'songs', 'loudness', 'title', 'artist']
    }
  }

  const renderInfo = (item, attr) => {
    switch (true) {
      case attr === 'key':
        return titleCase(renderText(keys, item[attr]))
      case attr === 'duration':
        return millisToMinutesAndSeconds(item[attr])
      case attr === 'tempo':
        return `${item[attr]} BPM`
      case attr === 'genre':
        return titleCase(item[attr])
      case attr === 'created_at':
      case attr === 'updated_at':
        return item[attr].split('T')[0]
      case typeof attr === 'object':
        return item[attr[0]][attr[1]]
      case attr === 'valence':
      case attr === 'instrumentalness':
      case attr === 'energy':
      case attr === 'liveness':
      case attr === 'acousticness':
      case attr === 'speechiness':
      case attr === 'danceability':
        return `${item[attr]}/ 1`
      case attr === 'loudness':
        return `${item[attr]} db`
      default:
        return item[attr]
    }
  }

  const renderItemCards = (items) => {
    return items[0].length
      ? items[0].map((item, index) => {
        const title = items[8] ? `${renderInfo(item, items[4])} (${items[8][index]} Songs)` : renderInfo(item, items[4])
        let dispatchValue
        if (item[items[4]] || item[items[4]] === 0) {
          dispatchValue = typeof item[items[4]] === 'string' ? item[items[4]] : item[items[4]].toString()
        }
        return (

               <Grid item xs={6} md={2} key={item} style={!matches ? { marginLeft: '30px' } : null}>
                <ItemCard
                    index={index}
                    picture={renderInfo(item, items[1])}
                    album={renderInfo(item, items[2])}
                    cardTitle={title}
                    cardInfo1={renderInfo(item, items[5])}
                    cardInfo2={renderInfo(item, items[6])}
                    dispatchKey={whichData === 'favorites' ? items[4] : undefined}
                    dispatchValue={whichData === 'favorites' ? dispatchValue : undefined }
                    type={items[3]}
                    id={item.id} />
              </Grid>

        )
      })
      : null
  }

  const renderRows = (metrics) => {
    return Object.keys(metrics).map(metric => {
      const title = metrics[metric][7] ? `${titleCase(metric)} (${titleCase(metrics[metric][7])})` : titleCase(metric)
      return (
        <Grid container key={title} align={matches ? 'center' : null} justify={matches ? 'center' : 'flex-start'} className={classes.container}>
            <Grid item xs={12}>
               <Typography className={classes.rowTitle} variant="h5" gutterBottom>{title}</Typography>
            </Grid>
            {matches
              ? <Grid item xs={12}>
                <Carousel navButtonsAlwaysVisible={true} autoPlay={false}>{renderItemCards(metrics[metric])}</Carousel> </Grid>
              : renderItemCards(metrics[metric])
              }

          </Grid>
      )
    })
  }

  return (
      <Grid container justify="center">
        <Grid item xs= {12}>
          {songs.length
            ? renderRows(data[whichData])
            : <NoMusicMessage objectType="songs" /> }
        </Grid>
      </Grid>
  )
}

export default UserMetrics
