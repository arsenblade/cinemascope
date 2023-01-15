import { useMemo } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router";
import { getAdminUrl } from "../../../../../constant/routesPath";
import { ActorService } from "../../../../../service/actor.service";
import { GenreService } from "../../../../../service/genre.service";
import { MovieService } from "../../../../../service/movie.service";
import { IMovie } from "../../../../../types/movies/movie.types";
import { getKeys } from "../../../../../utils/getKeys";
import { MyToast } from "../../../../ui/toast/MyToast";
import { IMovieEditInput } from "./movie-edit.interface";

export const useMovieEdit = (setValue:UseFormSetValue<IMovieEditInput>) => {
  const params = useParams();

  const queryMovie = useQuery(['movie edit input', params.id], () => 
  MovieService.getByIdMovieEditInput(String(params.id)), {
    onSuccess: (data) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key]);
      })
    },
    onError: () => {
      MyToast('Error movie', false)
    }
  })

  const {isLoading, data} = useQuery(['movie classic', params.id], () => 
  MovieService.getByIdClassic(String(params.id)), {
    onError: () => {
      MyToast('Error movie', false)
    }
  })

  const queryActors = useQuery('list of actor', () => ActorService.getAll(), {
		onError() {
      MyToast('Error actor list', false)
		},
	})

  const queryGenres = useQuery('list of genre', () => GenreService.getAll(), {
		onError() {
      MyToast('Error genre list', false)
		},
	})

  const navigate = useNavigate()

  const movie = data ? data.data : null

  const genres = queryGenres.data ? queryGenres.data : null

  const actors = queryActors.data ? queryActors.data : null

   const { mutateAsync} = useMutation(
		'update movie',
		(fieldData: IMovieEditInput) => MovieService.update(String(params.id), fieldData, movie, genres, actors),
		{
			onError() {
        MyToast('Error update', false)
			},
			onSuccess() {
        MyToast('Update was successful', true)
        navigate(getAdminUrl(`movies`))
			},
		})

    const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
      await mutateAsync(data)
    }
    
    return useMemo(() => ({
      isLoading,
      mutateAsync,
      onSubmit,
      queryActors,
      queryGenres
    }), [isLoading, mutateAsync, queryGenres, queryActors])
}