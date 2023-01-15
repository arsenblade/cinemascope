import { useMemo } from "react"
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../hooks/useAuth";
import { UserService } from "../../../service/user.service";
import { IUser } from "../../../types/user.types";
import { MyToast } from "../../ui/toast/MyToast";

export const useProfile = (setValue:UseFormSetValue<IUser>) => {
  const userAuth = useAuth();
  const id = userAuth.user ? userAuth.user.id : ''

  const {isLoading, data, refetch} = useQuery(['profile', id], () => 
  UserService.getById(id), {
    onSuccess: ({data}) => {
      setValue("email", data.email)
      setValue('isAdmin', data.isAdmin)
    },
    onError: () => {
      MyToast('Error profile', false)
    }
  })

  const user = data ? data.data : null

   const navigate = useNavigate()

   const { mutateAsync } = useMutation(
		'update profile',
		(dataField: IUser) => UserService.update(id, dataField, user),
		{
			onError() {
        MyToast('Error update', false)
			},
			onSuccess() {
        MyToast('Update was successful', true)
        refetch()
			},
		})

    const onSubmit: SubmitHandler<IUser> = async (data) => {
      await mutateAsync(data)
    }
    
    return useMemo(() => ({
      isLoading,
      mutateAsync,
      onSubmit,
    }), [isLoading, mutateAsync])
}