import axios from 'axios'

const songbook = axios.create({
  baseURL: 'http://localhost:8000/api'

})

songbook.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `token ${token}`
    } else {
      delete songbook.defaults.headers.common.Authorization
    }
    return config
  },

  (error) => Promise.reject(error)
)

export default songbook
