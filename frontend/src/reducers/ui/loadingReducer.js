import { LOADING, NOT_LOADING } from '../../actions/types'

const loadingReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case NOT_LOADING:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export default loadingReducer
