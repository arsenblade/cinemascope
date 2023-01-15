import { useMemo } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router";
import { getAdminUrl } from "../../../../../constant/routesPath";
import { GenreService } from "../../../../../service/genre.service";
import { IGenre } from "../../../../../types/movies/movie.types";
import { getKeys } from "../../../../../utils/getKeys";
import { MyToast } from "../../../../ui/toast/MyToast";

export const useGenresEdit = (setValue:UseFormSetValue<IGenre>) => {
  const params = useParams();

  const {isLoading} = useQuery(['genre', params.id], () => 
  GenreService.getById(String(params.id)), {
    onSuccess: ({data}) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key]);
      })
    },
    onError: () => {
      MyToast('Error genre', false)
    }
  })

   const navigate = useNavigate()

   const { mutateAsync} = useMutation(
		'update genre',
		(data: IGenre) => GenreService.update(String(params.id), data),
		{
			onError() {
        MyToast('Error update', false)
			},
			onSuccess() {
        MyToast('Update was successful', true)
        navigate(getAdminUrl(`genres`))
			},
		})

    const onSubmit: SubmitHandler<IGenre> = async (data) => {
      await mutateAsync(data)
    }
    
    return useMemo(() => ({
      isLoading,
      mutateAsync,
      onSubmit,
    }), [isLoading, mutateAsync])
}