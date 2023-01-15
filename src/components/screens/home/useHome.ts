import { useMemo } from "react"
import { useQuery } from "react-query"
import { getActorsUrl, getMoviesUrl } from "../../../constant/serverPath"
import { ActorService } from "../../../service/actor.service"
import { MovieService } from "../../../service/movie.service"
import { getGenresList } from "../../../utils/genreUtils"
import { IGalleryItem } from "../../ui/gallery/gallery.interface"
import { ISlide } from "../../ui/slider/slider.interface"
import { MyToast } from "../../ui/toast/MyToast"

export const useHome = () => {
  const {isLoading: isLoadingMovie, data: dataMovie} = useQuery(['movie list for slider'], () => 
  MovieService.getAll(), {
    onError: () => {
      MyToast('Error movie list', false)
    }
  })

  const {isLoading: isLoadingActor, data: dataActor} = useQuery(['actor list for slider'], () => 
  ActorService.getAll(), {
    onError: () => {
      MyToast('Error actor list', false)
    }
  })

  const slides: ISlide[] = dataMovie ? dataMovie.slice(0, 3).map(slide => ({
    id: slide.id,
    link: getMoviesUrl(slide.slug),
    subTitle: getGenresList(slide.genres),
    title: slide.title,
    bigPoster: slide.bigPoster,
  })) : []

  const popularMovies: IGalleryItem[] = dataMovie ? dataMovie.slice(0, 7).map(m => ({
    name: m.title,
    posterPath: m.poster,
    link: getMoviesUrl(m.slug),
    countOpened: m.countOpened
  })).sort((firstMovie, secondMovie) => secondMovie.countOpened - firstMovie.countOpened) : []


  const bestActors: IGalleryItem[] = dataActor ? dataActor.map(a => {

    const countMovies = dataMovie ? dataMovie.filter(m => m.actors.some((actor) => actor.id === a.id)) : []

    return {
      name: a.name,
      posterPath: a.photo,
      link: getActorsUrl(a.slug),
      countMovies: countMovies.length,
      content: {
        title: a.name,
        subTitle: `+${countMovies.length} movies`
      }
    }
  }).sort((firstActor, secondActor) => secondActor.countMovies - firstActor.countMovies).slice(0, 7)
  : []

  return useMemo(() => ({
    slides,
    popularMovies,
    bestActors,
    isLoadingMovie,
    isLoadingActor
  }), [isLoadingActor, isLoadingMovie])
}