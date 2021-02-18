import songbook from '../apis/songbook'
import { returnErrors } from './messages'
import { CREATE_FILE, DELETE_FILE, FETCH_FILES } from './types'

export const createFile = ({ file, extension, section, song }) => async (dispatch) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('extension', extension)
  formData.append('section', section)
  formData.append('song', song)
  try {
    const response = await songbook.post('/files/', formData)
    dispatch({
      type: CREATE_FILE,
      payload: response.data
    })
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}

export const fetchFiles = () => async (dispatch) => {
  try {
    const response = await songbook.get('/files/')
    dispatch({
      type: FETCH_FILES,
      payload: response.data
    })
  } catch (error) {
    dispatch(returnErrors(error.response))
  }
}

export const deleteFile = (id) => async (dispatch) => {
  try {
    await songbook.delete(`/files/${id}`)

    dispatch({
      type: DELETE_FILE,
      payload: id
    })
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status))
  }
}
