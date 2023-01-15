import { useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useAuth } from "../../../../hooks/useAuth"
import { MovieService } from "../../../../service/movie.service"
import { IMovie, IRating } from "../../../../types/movies/movie.types"
import { ratingCalculation } from "../../../../utils/ratingCalculation"
import { MyToast } from "../../../ui/toast/MyToast"


export const useRateMovie = (movieId: string) => {
  const {user} = useAuth()
  const [isSended, setIsSended] = useState(false)
  const [rating, setRating] = useState(0)

  const {data: dataMovie, isLoading: isLoadingMovie, refetch} = useQuery('rating movie', () => 
  MovieService.getByIdClassic(movieId), {
    onSuccess: ({data}) => {
      setRating(ratingCalculation(data.rating))
    },
    onError: () => {
      MyToast('Error movie', false)
    }
  })



  const {mutateAsync} = useMutation('set rating movie', (movie: IMovie) => MovieService.updateRate(movie), {
    onSuccess: () => {
      MyToast('You have successfully rated!', true)

      setIsSended(true)
      refetch()
      setTimeout(() => {
        setIsSended(false)
      }, 2400)
    },
    onError:() => {
      MyToast('Rate movie', false)
    },
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClick = async (nextValue: number) => {
    if(user && dataMovie) {
      setRating(nextValue)
      const newRating: IRating[] = dataMovie.data.rating.filter(rat => rat.idUser !== user.id)
      newRating.push({
        idUser: user.id,
        value: nextValue
      })
      dataMovie.data.rating = newRating
      await mutateAsync(dataMovie.data)
    }
  }

  return useMemo(() => ({
    isSended, rating, handleClick
  }), [handleClick, isSended, rating])
}