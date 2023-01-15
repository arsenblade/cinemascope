import { useMemo } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router";
import { getAdminUrl } from "../../../../../constant/routesPath";
import { ActorService } from "../../../../../service/actor.service";
import { IActor } from "../../../../../types/movies/movie.types";
import { getKeys } from "../../../../../utils/getKeys";
import { MyToast } from "../../../../ui/toast/MyToast";

export const useActorEdit = (setValue:UseFormSetValue<IActor>) => {
  const {id}= useParams();

  const {isLoading} = useQuery(['actor', id], () => 
  ActorService.getById(String(id)), {
    onSuccess: ({data}) => {
      getKeys(data).forEach(key => {
        setValue(key, data[key]);
      })
    },
    onError: () => {
      MyToast('Error actor', false)
    }
  })

   const navigate = useNavigate()

   const { mutateAsync} = useMutation(
		'update actor',
		(data: IActor) => ActorService.update(String(id), data),
		{
			onError() {
        MyToast('Error update', false)
			},
			onSuccess() {
        MyToast('Update was successful', true)
        navigate(getAdminUrl(`actors`))
			},
		})

    const onSubmit: SubmitHandler<IActor> = async (data) => {
      await mutateAsync(data)
    }
    
    return useMemo(() => ({
      isLoading,
      mutateAsync,
      onSubmit,
    }), [isLoading, mutateAsync])
}