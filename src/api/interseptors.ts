import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../constant/serverPath";


export const axiosPublic = axios.create({
  baseURL: API_URL
})

export const axiosPrivate = axios.create({
  baseURL: API_URL,
})


axiosPrivate.interceptors.request.use((config) => {
  const accessToken = Cookies.get('accessToken')

  if(config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})