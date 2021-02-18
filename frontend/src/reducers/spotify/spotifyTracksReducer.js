import _ from 'lodash'

import { CLEAR_ALL, CLEAR_SPOTIFY_TRACKS, FETCH_SPOTIFY_TRACKS, IMPORT_SPOTIFY_TRACK } from '../../actions/types'

const initialState = {
  tracks: {},
  importedSong: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SPOTIFY_TRACKS:
      return { ...state, tracks: _.mapKeys(action.payload, 'name') }
    case CLEAR_SPOTIFY_TRACKS:
      return initialState
    case IMPORT_SPOTIFY_TRACK:
      return { ...state, importedSong: action.payload }
    case CLEAR_ALL:
      return initialState
    default:
      return state
  }
}
