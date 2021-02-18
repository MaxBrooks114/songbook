import songbook from '../apis/songbook'
import history from '../history'
import { returnErrors } from './messages'
import { CREATE_SONG, DELETE_SECTION, DELETE_SONG, EDIT_SONG, FETCH_SONGS } from './types'
import { loading, notLoading, showSuccessSnackbar } from './ui'

export const createSong = (formValues) => async (dispatch) => {
  dispatch(loading())
  const formData = new FormData()
  for (const field in formValues) {
    if (field === 'sections') {
      formData.append('sections[]', [])
    } else {
      formData.append(field, formValues[field])
    }
  }

  try {
    const response = await songbook.post('/songs/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    dispatch({
      type: CREATE_SONG,
      payload: response.data
    })

    if (history.location.pathname.includes('songs/new')) {
      history.push(`/songs/${response.data.id}`)
      dispatch(showSuccessSnackbar('Song Created'))
    }
    dispatch(fetchSongs())
    dispatch(notLoading())
    return response.data
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
  dispatch(notLoading())
}

export const fetchSongs = () => async (dispatch) => {
  dispatch(loading())
  try {
    const response = await songbook.get('/songs/')

    dispatch({
      type: FETCH_SONGS,
      payload: response.data
    })
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
  dispatch(notLoading())
}

export const deleteSong = (id, song) => async (dispatch) => {
  try {
    await songbook.delete(`/songs/${id}/`)
    for (const section of song.sections) {
      dispatch({
        type: DELETE_SECTION,
        payload: section
      })
    }
    dispatch({
      type: DELETE_SONG,
      payload: id
    })

    history.push('/songs')
    dispatch(showSuccessSnackbar('Song Deleted'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}

export const editSong = (id, formValues) => async (dispatch) => {
  const formData = new FormData()
  for (const field in formValues) {
    if (field === 'sections') {
      formData.append('sections[]', [])
    } else if (!formValues[field] && field !== 'original') {
      continue
    } else {
      formData.append(field, formValues[field])
    }
  }
  try {
    const response = await songbook.patch(`/songs/${id}/`, formData)

    dispatch({
      type: EDIT_SONG,
      payload: response.data
    })

    history.push(`/songs/${id}`)
    dispatch(showSuccessSnackbar('Song Updated Succesfully'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}
