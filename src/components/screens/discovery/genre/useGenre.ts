import { useMemo } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import { GenreService } from "../../../../service/genre.service"
import { MovieService } from "../../../../service/movie.service"
import { MyToast } from "../../../ui/toast/MyToast"


export const useGenre = () => {
  const params = useParams()
  const slug = params.slug ? params.slug : ''

  const {data, isLoading} = useQuery(['genre by slug', slug], () => 
  GenreService.getBySlug(slug), {
    onError: () => {
      MyToast('Error genre', false)
    }
  })

  return useMemo(() => ({
    isLoading,
    data
  }), [data, isLoading])
}