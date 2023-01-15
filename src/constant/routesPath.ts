
export enum routesPath {
  MAIN_ROUTE = '/',
  AUTH_ROUTE = '/auth',
  ADMIN_INDEX = '/manage',
  ADMIN_USERS = '/manage/users',
  ADMIN_MOVIES = '/manage/movies',
  ADMIN_ACTORS = '/manage/actors',
  ADMIN_GENRES = '/manage/genres',
  ADMIN_GENRES_ITEM = '/manage/genres/:id',
  ADMIN_MOVIES_ITEM = '/manage/movies/:id',
  ADMIN_ACTORS_ITEM = '/manage/actors/:id',
  ADMIN_USERS_ITEM = '/manage/users/:id',
  PROFILE_ROUTE = '/profile',
  FRESH_ROUTE = '/fresh',
  TRENDING_ROUTE = '/trending',
  DISCOVERY_ROUTE = '/genres',
  ACTORS_ITEM_ROUTE = '/actors/:slug',
  DISCOVERY_ITEM_ROUTE = '/genres/:slug',
  FAVORITES_ROUTE = '/favorites',
  MOVIE_ITEM_ROUTE = '/movies/:slug',
  ERROR_404 = '*'
}

export const getHomeUrl = (string: string) => `/${string}`
export const getAdminHomeUrl = () => `/manage`
export const getAdminUrl = (string: string) => `/manage/${string}`