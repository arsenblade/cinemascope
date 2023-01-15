import { useMemo } from "react"
import { useQuery } from "react-query"
import { MovieService } from "../../../service/movie.service"

import { MyToast } from "../../ui/toast/MyToast"

export const useTrending = () => {
  const {isLoading, data} = useQuery(['movie list for trending'], () => 
  MovieService.getAll(), {
    onError: () => {
      MyToast('Error movie list', false)
    }
  })

  const dataMovie = data ? data.sort((firstMovie, secondMovie) => secondMovie.countOpened - firstMovie.countOpened) : []

  return useMemo(() => ({
    isLoading,
    dataMovie
  }), [isLoading])
}