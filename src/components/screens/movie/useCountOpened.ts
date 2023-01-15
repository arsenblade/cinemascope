import { useEffect } from "react"
import { useMutation } from "react-query"
import { MovieService } from "../../../service/movie.service"

export const useCountOpened = (slug: string | undefined) => {
  const {mutateAsync} = useMutation('update count opened', () => MovieService.updateCountOpened(slug || null))

  useEffect(() => {
    mutateAsync()
  }, [slug])

  return 
}