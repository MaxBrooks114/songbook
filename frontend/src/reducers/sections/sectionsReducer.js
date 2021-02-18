import _ from 'lodash'

import {
  CLEAR_ALL,
  CREATE_SECTION,
  DELETE_SECTION,
  EDIT_SECTION,
  FETCH_SECTIONS
} from '../../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SECTIONS:
      return { ...state, ..._.mapKeys(action.payload, 'id') }
    case CREATE_SECTION:
      return { ...state, [action.payload.id]: action.payload }
    case EDIT_SECTION:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_SECTION:
      return _.omit(state, action.payload)
    case CLEAR_ALL:
      return initialState
    default:
      return state
  }
}
