import { useEffect, useMemo } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import { getMoviesUrl } from "../../../constant/serverPath"
import { MovieService } from "../../../service/movie.service"
import { sortSimilarMovies } from "../../../utils/sorting"
import { MyToast } from "../../ui/toast/MyToast"

export const useMovie = () => {
  const params = useParams()
  const slug = params.slug ? params.slug : ''

  const {data: dataMovies, isLoading: isLoadingMovies} = useQuery('similar movies', () => 
  MovieService.getAll(), {
    onError: () => {
      MyToast('Error movie list', false)
    }
  })


  const {data: dataMovie, isLoading: isLoadingMovie} = useQuery(['movie by slug', slug], () => 
  MovieService.getBySlug(slug), {
    onError: () => {
      MyToast('Error movie', false)
    }
  })

  const similarMovies = dataMovie ? sortSimilarMovies(dataMovies || [], dataMovie).filter(m => m.id !== dataMovie.id).map(m => ({
    name: m.title,
    posterPath: m.poster,
    link: getMoviesUrl(m.slug)
  })):[]

  return useMemo(() => ({
    isLoadingMovie,
    isLoadingMovies,
    dataMovie,
    similarMovies
  }), [dataMovie, isLoadingMovies, isLoadingMovie])
}