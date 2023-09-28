import axios, { AxiosResponse } from "axios";
import { BASE_URL } from '../config'

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 6000
})

request.interceptors.response.use((res: AxiosResponse) => {
  return res.data.data
}, (err) => {
  Promise.reject(err)
})

export default request