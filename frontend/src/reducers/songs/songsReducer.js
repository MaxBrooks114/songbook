import _ from 'lodash'

import { CLEAR_ALL, CREATE_SONG, DELETE_SONG, EDIT_SONG, FETCH_SONGS } from '../../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return { ...state, ..._.mapKeys(action.payload, 'id') }
    case CREATE_SONG:
      return { ...state, [action.payload.id]: action.payload }
    case EDIT_SONG:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_SONG:
      return _.omit(state, action.payload)
    case CLEAR_ALL:
      return initialState
    default:
      return state
  }
}
