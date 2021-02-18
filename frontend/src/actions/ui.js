import { LOADING, NOT_LOADING, SNACKBAR_CLEAR, SNACKBAR_SUCCESS } from './types'

export const showSuccessSnackbar = (message, songId) => {
  return (dispatch) => {
    dispatch({ type: SNACKBAR_SUCCESS, message, songId })
  }
}

export const clearSnackbar = () => {
  return (dispatch) => {
    dispatch({ type: SNACKBAR_CLEAR })
  }
}

export const loading = () => {
  return (dispatch) => {
    dispatch({ type: LOADING })
  }
}
export const notLoading = () => {
  return (dispatch) => {
    dispatch({ type: NOT_LOADING })
  }
}
