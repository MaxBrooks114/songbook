import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import authReducer from './auth/authReducer'
import errorsReducer from './errorsReducer'
import filesReducer from './filesReducer'
import instrumentsReducer from './instruments/instrumentsReducer'
import messagesReducer from './messagesReducer'
import sectionsReducer from './sections/sectionsReducer'
import songsReducer from './songs/songsReducer'
import spotifyPlayerReducer from './spotify/spotifyPlayerReducer'
import spotifyTracksReducer from './spotify/spotifyTracksReducer'
import filterReducer from './ui/filterReducer'
import loadingReducer from './ui/loadingReducer'
import snackbarReducer from './ui/snackbarReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  spotifyTracks: spotifyTracksReducer,
  spotifyPlayer: spotifyPlayerReducer,
  form: formReducer,
  songs: songsReducer,
  instruments: instrumentsReducer,
  sections: sectionsReducer,
  files: filesReducer,
  snackbar: snackbarReducer,
  loading: loadingReducer,
  filter: filterReducer
})
