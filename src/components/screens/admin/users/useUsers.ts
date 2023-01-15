import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router"
import { getAdminUrl } from "../../../../constant/routesPath"
import { useDebounce } from "../../../../hooks/useDebounce"
import { UserService } from "../../../../service/user.service"
import { convertDate } from "../../../../utils/convertDate"
import { ITableItem } from "../../../ui/admin-table/AdminTable/admin-table.interface"
import { MyToast } from "../../../ui/toast/MyToast"

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  const queryData = useQuery(['user list', debouncedSearch], () => 
  UserService.getAll((debouncedSearch)), {
    select: (data) => data.map((user):ITableItem => ({
      id: user.id,
      editUrl: getAdminUrl(`users/${user.id}`),
      items: [user.email, convertDate(user.createdAt)]
    })),
    onError: () => {
      MyToast('Error user list', false)
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

    const { mutateAsync: deleteAsync } = useMutation(
      'delete user',
      (userId: string) => UserService.delete(userId),
      {
        onError() {
          MyToast('Error delete', false)
        },
        onSuccess() {
          MyToast('Delete was successful', true)
          queryData.refetch()
        },
      }
    )
    
    return useMemo(() => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
    }), [ deleteAsync, queryData, searchTerm])
}