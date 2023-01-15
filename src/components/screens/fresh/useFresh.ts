import { useMemo } from "react"
import { useQuery } from "react-query"
import { MovieService } from "../../../service/movie.service"

import { MyToast } from "../../ui/toast/MyToast"

export const useFresh = () => {
  const {isLoading, data} = useQuery(['movie list for fresh'], () => 
  MovieService.getAll(), {
    onError: () => {
      MyToast('Error movie list', false)
    }
  })

  const dataMovie = data ? data.sort((firstMovie, secondMovie) => secondMovie.parameters.year - firstMovie.parameters.year) : []

  return useMemo(() => ({
    isLoading,
    dataMovie
  }), [isLoading])
}