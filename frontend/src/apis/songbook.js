import axios from 'axios'

let baseURL

if (window.location.origin === "http://localhost:3000") {
  baseURL = "http://127.0.0.1:8000/api"
} else {
  baseURL = `${window.location.origin}/api`
}
const songbook = axios.create({
    baseURL: baseURL

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
