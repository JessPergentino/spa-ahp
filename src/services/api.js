import axios from 'axios'
import { get } from 'idb-keyval'

const api = axios.create({
  baseURL: 'https://ahp-api.herokuapp.com'
})

api.interceptors.request.use(async config => {
  const token = await get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
