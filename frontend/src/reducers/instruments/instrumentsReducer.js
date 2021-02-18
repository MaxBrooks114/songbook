import _ from 'lodash'

import {
  CLEAR_ALL,
  CREATE_INSTRUMENT,
  DELETE_INSTRUMENT,
  EDIT_INSTRUMENT,
  FETCH_INSTRUMENTS
} from '../../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INSTRUMENTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') }
    case CREATE_INSTRUMENT:
      return { ...state, [action.payload.id]: action.payload }
    case EDIT_INSTRUMENT:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_INSTRUMENT:
      return _.omit(state, action.payload)
    case CLEAR_ALL:
      return initialState
    default:
      return state
  }
}
