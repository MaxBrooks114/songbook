import { fetchInstruments } from '../actions/instruments'
import { fetchSections } from '../actions/sections'
import { fetchSongs } from '../actions/songs'
import songbook from '../apis/songbook'
import history from '../history'
import { returnErrors } from './messages'
import {
  AUTH_ERROR,
  CLEAR_ALL,
  DELETE_USER,
  EDIT_USER,
  FETCH_USER,
  LOGIN_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_FAIL,
  REGISTER_USER,
  RESET_PASSWORD,
  USER_LOADING
} from './types'
import { loading, notLoading, showSuccessSnackbar } from './ui'

export const fetchUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  })
  try {
    const response = await songbook.get('/auth/user')
    dispatch({
      type: FETCH_USER,
      payload: response.data
    })
  } catch (error) {
    if (error.response) {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({
        type: AUTH_ERROR
      })
    }
  }
}

export const login = (formValues) => async (dispatch) => {
  dispatch(loading())
  try {
    const response = await songbook.post('/auth/login', { ...formValues })

    dispatch({
      type: LOGIN_USER,
      payload: response.data
    })

    dispatch(fetchSections())
    dispatch(fetchSongs())
    dispatch(fetchInstruments())
    history.push('/')
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
    dispatch({
      type: LOGIN_FAIL
    })
  }

  dispatch(notLoading())
}

export const register = (formValues) => async (dispatch) => {
  dispatch(loading())
  try {
    const response = await songbook.post('/auth/register', { ...formValues })

    dispatch({
      type: REGISTER_USER,
      payload: response.data
    })
    history.push('/')
  } catch (error) {
    if (error.response) {
      dispatch(returnErrors(error.response.data, error.response.status))
      dispatch({
        type: REGISTER_FAIL
      })
    }
  }

  dispatch(notLoading())
}

export const editUser = (userId, formValues) => async (dispatch) => {
  try {
    const response = await songbook.patch(`/auth/user/edit/${userId}/`, formValues)

    dispatch({
      type: EDIT_USER,
      payload: response.data
    })

    dispatch(fetchUser())
    dispatch(showSuccessSnackbar('Your Profile Was Updated Successfully'))
    history.push(`/users/${userId}/progress`)
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}

export const resetPassword = (userId, formValues) => async (dispatch) => {
  try {
    const response = await songbook.patch(`/auth/user/passwordreset/${userId}/`, formValues)

    dispatch({
      type: RESET_PASSWORD,
      payload: response.data
    })

    dispatch(fetchUser())
    dispatch(showSuccessSnackbar('Your Profile Was Updated Successfully'))
    history.push(`/users/${userId}/progress`)
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}

export const logout = () => (dispatch) => {
  songbook.post('auth/logout')

  dispatch({ type: CLEAR_ALL })
  dispatch({ type: LOGOUT_USER })
}

export const deleteUser = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/auth/user/delete/${id}/`)

    dispatch({ type: CLEAR_ALL })
    dispatch({
      type: DELETE_USER,
      payload: id
    })

    history.push('/register')
    dispatch(showSuccessSnackbar('Account Successfully Deleted'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}
