import songbook from '../apis/songbook'
import history from '../history'
import { returnErrors } from './messages'
import { CREATE_INSTRUMENT, DELETE_INSTRUMENT, EDIT_INSTRUMENT, FETCH_INSTRUMENTS } from './types'
import { loading, notLoading, showSuccessSnackbar } from './ui'

export const createInstrument = (formValues) => async (dispatch) => {
  dispatch(loading())

  try {
    const response = await songbook.post('/instruments/', { ...formValues })
    dispatch({
      type: CREATE_INSTRUMENT,
      payload: response.data
    })
    history.push(`/instruments/${response.data.id}`)
    dispatch(fetchInstruments)
    dispatch(showSuccessSnackbar('Instrument Added'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }

  dispatch(notLoading())
}

export const fetchInstruments = () => async (dispatch) => {
  dispatch(loading())

  try {
    const response = await songbook.get('/instruments/')
    dispatch({
      type: FETCH_INSTRUMENTS,
      payload: response.data
    })
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
  dispatch(notLoading())
}

export const deleteInstrument = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/instruments/${id}`)

    dispatch({
      type: DELETE_INSTRUMENT,
      payload: id
    })

    history.push('/instruments')
    dispatch(showSuccessSnackbar('Instrument Deleted'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}

export const editInstrument = (id, formValues) => async (dispatch) => {
  try {
    const response = await songbook.patch(`/instruments/${id}/`, formValues)

    dispatch({
      type: EDIT_INSTRUMENT,
      payload: response.data
    })

    history.push(`/instruments/${id}`)
    dispatch(showSuccessSnackbar('Instrument Updated Succesfully'))
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}
