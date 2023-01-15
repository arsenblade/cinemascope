import { routesPath } from "../constant/routesPath"
import Index from "../pages"
import Page404 from "../pages/404"
import ActorPage from "../pages/actor"
import AdminActorsPage from "../pages/admin/actors/actors"
import ActorsItemPage from "../pages/admin/actors/actorsItem"
import AdminIndexPage from "../pages/admin/adminIndexPage"
import AdminGenresPage from "../pages/admin/genres/genres"
import GenresItemPage from "../pages/admin/genres/genresItem"
import AdminMoviesPage from "../pages/admin/movies/movies"
import MoviesItemPage from "../pages/admin/movies/moviesItem"
import AdminUsersPage from "../pages/admin/users/users"
import UsersItemPage from "../pages/admin/users/usersItem"

import AuthPage from "../pages/auth"
import DiscoveryPage from "../pages/discovery"
import FavoritesPage from "../pages/favorites"
import FreshPage from "../pages/fresh"
import GenrePage from "../pages/genre"
import MoviePage from "../pages/movie"
import ProfilePage from "../pages/profile"
import TrendingPage from "../pages/trending"


export const publicRoutes = [
  {
    path: routesPath.MAIN_ROUTE,
    Component: Index
  },
  {
    path: routesPath.AUTH_ROUTE,
    Component: AuthPage
  },
  {
    path: routesPath.ERROR_404,
    Component: Page404
  },
  {
    path: routesPath.FRESH_ROUTE,
    Component: FreshPage
  },
  {
    path: routesPath.TRENDING_ROUTE,
    Component: TrendingPage
  },
  {
    path: routesPath.DISCOVERY_ROUTE,
    Component: DiscoveryPage
  },
  {
    path: routesPath.DISCOVERY_ITEM_ROUTE,
    Component: GenrePage
  },
  {
    path: routesPath.ACTORS_ITEM_ROUTE,
    Component: ActorPage
  },
  {
    path: routesPath.MOVIE_ITEM_ROUTE,
    Component: MoviePage
  },
]

export const authRoutes = [
  {
    path: routesPath.PROFILE_ROUTE,
    Component: ProfilePage
  },
  {
    path: routesPath.FAVORITES_ROUTE,
    Component: FavoritesPage
  },
]

export const adminRoutes = [
  {
    path: routesPath.ADMIN_INDEX,
    Component: AdminIndexPage
  },
  {
    path: routesPath.ADMIN_ACTORS,
    Component: AdminActorsPage
  },
  {
    path: routesPath.ADMIN_GENRES,
    Component: AdminGenresPage
  },
  {
    path: routesPath.ADMIN_MOVIES,
    Component: AdminMoviesPage
  },
  {
    path: routesPath.ADMIN_USERS,
    Component: AdminUsersPage
  },
  {
    path: routesPath.ADMIN_ACTORS_ITEM,
    Component: ActorsItemPage
  },
  {
    path: routesPath.ADMIN_GENRES_ITEM,
    Component: GenresItemPage
  },
  {
    path: routesPath.ADMIN_MOVIES_ITEM,
    Component: MoviesItemPage
  },
  {
    path: routesPath.ADMIN_USERS_ITEM,
    Component: UsersItemPage
  },
  
]