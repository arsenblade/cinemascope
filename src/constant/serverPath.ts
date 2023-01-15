
export const getAuthUrl = (string: string) => string === '' ? `/` : `/${string}`
export const getUsersUrl = (string: string) => string === '' ? `/users` : `/users/${string}`
export const getMoviesUrl = (string: string) => string === '' ? `/movies` : `/movies/${string}`
export const getActorsUrl = (string: string) => string === '' ? `/actors` : `/actors/${string}`
export const getGenresUrl = (string: string) => string === '' ? `/genres` : `/genres/${string}`
export const getAuthLogin = (string: string) => `https://test-render-back.onrender.com/${string}`

export const API_URL = 'https://test-render-back.onrender.com'