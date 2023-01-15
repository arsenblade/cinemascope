import { useMemo } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router";
import { getAdminUrl } from "../../../../../constant/routesPath";
import { UserService } from "../../../../../service/user.service";
import { IUser } from "../../../../../types/user.types";
import { MyToast } from "../../../../ui/toast/MyToast";

export const useUserEdit = (setValue:UseFormSetValue<IUser>) => {
  const params = useParams();

  const {isLoading, data} = useQuery(['user', params.id], () => 
  UserService.getById(String(params.id)), {
    onSuccess: ({data}) => {
      setValue("email", data.email)
      setValue('isAdmin', data.isAdmin)
    },
    onError: () => {
      MyToast('Error user', false)
    }
  })

  const user = data ? data.data : null

   const navigate = useNavigate()

   const { mutateAsync } = useMutation(
		'update user',
		(dataField: IUser) => UserService.update(String(params.id), dataField, user),
		{
			onError() {
        MyToast('Error update', false)
			},
			onSuccess() {
        MyToast('Update was successful', true)
        navigate(getAdminUrl(`users`))
			},
		})

    const onSubmit: SubmitHandler<IUser> = async (data) => {
      await mutateAsync(data)
    }
    
    return useMemo(() => ({
      isLoading,
      mutateAsync,
      onSubmit,
      data
    }), [isLoading, mutateAsync])
}