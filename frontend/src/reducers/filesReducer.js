import _ from 'lodash'

import { CLEAR_ALL, CREATE_FILE, DELETE_FILE, FETCH_FILES } from './../actions/types'

const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILES:
      return { ...state, ..._.mapKeys(action.payload, 'id') }
    case CREATE_FILE:
      return { ...state, [action.payload.id]: action.payload }
    case DELETE_FILE:
      return _.omit(state, action.payload)
    case CLEAR_ALL:
      return initialState
    default:
      return state
  }
}
