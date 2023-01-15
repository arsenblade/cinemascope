import { useMemo } from "react"
import { useQuery } from "react-query"
import { useAuth } from "../../../hooks/useAuth"
import { MovieService } from "../../../service/movie.service"
import { UserService } from "../../../service/user.service"
import { MyToast } from "../../ui/toast/MyToast"

export const useFavorites = () => {
  const {user} = useAuth()
  const {isLoading, data: dataUser, refetch} = useQuery('favorites user data', () => UserService.getById(user?.id || ''), {
    select: ({data}) => data,
    enabled: !!user
  })

  const {data: dataMovies, isLoading: isLoadingMovies} = useQuery('favorites movies', () => 
  MovieService.getAll(), {
    onError: () => {
      MyToast('Error movie list', false)
    }
  })

  const favoritesMovies = dataUser && dataMovies ? dataMovies.filter(m => dataUser.favorites.some(f => f === m.id)) : []

  return useMemo(() => ({
    isLoading,
    refetch,
    favoritesMovies,
    dataUser}), [dataUser, isLoading, refetch, favoritesMovies])
}