import { useMemo } from "react"
import { useQuery } from "react-query"
import { GenreService } from "../../../service/genre.service"
import { MovieService } from "../../../service/movie.service"
import { IMovie } from "../../../types/movies/movie.types"
import { ICollections } from "../../ui/collections/collections.interface"

import { MyToast } from "../../ui/toast/MyToast"

export const useDiscovery = () => {
  const {data} = useQuery(['movie list for discovery'], () => 
  MovieService.getAll(), {
    onError: () => {
      MyToast('Error movie list', false)
    }
  })
  // id: string,
  // image: string,
  // title: string,
  // slug: string
  let movieList = data ? data : []

  const {isLoading, data: genreList} = useQuery(['genre list for discovery'], () => 
  GenreService.getAll(), {
    onError: () => {
      MyToast('Error genre list', false)
    }
  })

  const genreDiscovery: ICollections[] = genreList ?
    genreList.map((genre) => {
      let imageMovie = ''
      movieList.forEach((movie) => {
        movie.genres.forEach((g) => {
          if(g.slug === genre.slug && imageMovie === '') {
            imageMovie = movie.bigPoster

            movieList = movieList.filter((m) => m !== movie)
          }
        })
      })

      return {
        id: genre.id,
        image: imageMovie,
        title: genre.name,
        slug: genre.slug
      }
    })
  : []


  return useMemo(() => ({
    isLoading,
    genreDiscovery
  }), [isLoading])
}