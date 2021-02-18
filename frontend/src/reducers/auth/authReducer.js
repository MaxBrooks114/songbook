import {
  AUTH_ERROR,
  DELETE_USER,
  EDIT_USER,
  FETCH_USER,
  GET_DEVICE_ID,
  LOGIN_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  REFRESH_ACCESS_TOKEN,
  REGISTER_FAIL,
  REGISTER_USER,
  RESET_PASSWORD,
  USER_LOADING
} from '../../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  user: null,
  isLoading: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }

    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        isLoading: false
      }
    case REGISTER_USER:
    case LOGIN_USER:

      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case EDIT_USER:
    case RESET_PASSWORD:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case REFRESH_ACCESS_TOKEN:
      return {
        ...state,
        user: {
          ...state.user,
          spotify_info: {
            ...state.user.spotify_info,
            access_token: action.payload
          }
        }
      }

    case GET_DEVICE_ID:
      return {
        ...state,
        user: {
          ...state.user,
          spotify_info: {
            ...state.user.spotify_info,
            device_id: action.payload
          }
        }
      }
    case LOGOUT_USER:
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case DELETE_USER:
      localStorage.removeItem('token')
      return {
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }

    default:
      return state
  }
}
