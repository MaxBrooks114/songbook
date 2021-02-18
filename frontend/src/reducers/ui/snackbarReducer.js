import { SNACKBAR_CLEAR, SNACKBAR_SUCCESS } from '../../actions/types'

const snackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case SNACKBAR_SUCCESS:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
        songId: action.songId
      }
    case SNACKBAR_CLEAR:
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        infoSnackbarOpen: false,
        songId: ''
      }
    default:
      return state
  }
}

export default snackbarReducer
