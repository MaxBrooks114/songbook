import modes from '../dataToImport/modes'
import { audioFeaturesToNumbers, renderText } from '../helpers/detailHelpers'

const getFilters = (state) => state.filter
const getSections = (state) => state.sections
const getInstruments = (state) => state.instruments
const getSongs = (state) => state.songs

export const getFilteredItems = (state, objectType) => {
  const filterAttributes = getFilters(state)
  const filterKeys = Object.keys(filterAttributes).filter(attr =>
    // filter out unwanted filters
    (attr !== 'filter' && attr !== 'loudness' && attr !== 'sort' && attr !== 'order') ||
    // boolean filters with empty string will resolve to false so need to account for that
    (attr === 'learned' && filterAttributes[attr] !== '') ||
    (attr === 'original' && filterAttributes[attr] !== '') ||
    (attr === 'explicit' && filterAttributes[attr] !== ''))

  const songs = getSongs(state)
  const sections = getSections(state)
  const instruments = getInstruments(state)
  const orderArray = filterAttributes.order === 'ascending' ? [1, -1] : [-1, 1]
  const items = objectType === 'songs' ? songs : sections

  if (filterAttributes.filter) {
    return Object.values(items).filter(item => {
      const fk = filterKeys.filter(attr =>
        (filterAttributes[attr] && item[attr]) ||
        (filterAttributes[attr] && item[attr] === 0) ||
        (filterAttributes[attr] && Object.keys(item).includes(attr)) ||
        (objectType === 'sections' && attr === 'instrument' && filterAttributes.instrument !== '' && filterAttributes.instrument !== null))
      return fk.every(prop => {
        switch (true) {
          case prop === 'key':
          case prop === 'time_signature' :
            return item[prop] !== null && item[prop] !== '' && parseInt(item[prop]) === parseInt(filterAttributes[prop])
          case prop === 'mode' :
            return item[prop] && renderText(modes, item[prop]).toLowerCase() === renderText(modes, filterAttributes[prop]).toLowerCase()
          case prop === 'original':
          case prop === 'explicit':
          case prop === 'learned':
            return item[prop] === filterAttributes[prop]
          case prop === 'acousticness' :
          case prop === 'danceability' :
          case prop === 'instrumentalness' :
          case prop === 'energy' :
          case prop === 'liveness' :
          case prop === 'speechiness' :
          case prop === 'valence' :
            return (audioFeaturesToNumbers(item[prop]) >= filterAttributes[prop][0] && audioFeaturesToNumbers(item[prop]) <= filterAttributes[prop][1])
          case prop === 'tempo' :
          case prop === 'duration' :
            return (item[prop] >= parseInt(filterAttributes[prop][0]) && item[prop] <= parseInt(filterAttributes[prop][1]))
          case prop === 'year':
            return item[prop].split('-')[0] >= filterAttributes[prop][0] && item[prop].split('-')[0] <= filterAttributes[prop][1]
          case prop === 'title':
          case prop === 'name':
            return item[prop].toLowerCase().includes(filterAttributes[prop].toLowerCase())
          case prop === 'artist':
          case prop === 'album':
          case prop === 'genre':

            return item[prop] === filterAttributes[prop]
          case prop === 'instrument':
            // nested serializers in django are annoying. instead of displaying the whole object in state, need to grab from separate piece of state
            const instrument = Object.values(instruments).filter(instrument => instrument.name.toLowerCase() === filterAttributes[prop].toLowerCase())[0]
            return item.instruments.includes(instrument.id)

          case prop === 'song':
            // would rather do this by song id, but the combination of redux form and material ui's autocomplete make this almost impossible
            return item[prop].title.toLowerCase().includes(filterAttributes[prop].toLowerCase())
          default:
            return false
        }
      })
    }).sort((a, b) => (a[filterAttributes.sort] > b[filterAttributes.sort] ? orderArray[0] : orderArray[1]))
  } else if (!filterAttributes.sort || filterAttributes.sort === 'song') {
    return Object.values(items).sort((a, b) => (a.id > b.id ? 1 : -1))
  } else {
    return Object.values(items).sort((a, b) => (a[filterAttributes.sort] > b[filterAttributes.sort] ? 1 : -1))
  }
}
