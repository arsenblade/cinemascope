import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router"
import { getAdminUrl } from "../../../../constant/routesPath"
import { useDebounce } from "../../../../hooks/useDebounce"
import { ActorService } from "../../../../service/actor.service"
import { MovieService } from "../../../../service/movie.service"
import { ITableItem } from "../../../ui/admin-table/AdminTable/admin-table.interface"
import { MyToast } from "../../../ui/toast/MyToast"

export const useActors = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const {isLoading: isLoadingMovie, data: dataMovie} = useQuery(['movie list for admin actors'], () => 
  MovieService.getAll(), {
    onError: () => {
      MyToast('Error movie list', false)
    }
  })

  const queryData = useQuery(['actor list', debouncedSearch], () => 
  ActorService.getAll((debouncedSearch)), {
    select: (data) => data.map((actor):ITableItem => {
      const countMovies = dataMovie ? dataMovie.filter(m => m.actors.some((a) => a.id === actor.id)) : []

      return {
        id: actor.id,
        editUrl: getAdminUrl(`actors/${actor.id}`),
        items: [actor.name, String(countMovies.length)]
      }
    }),
    onError: () => {
      MyToast('Error actor list', false)
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

   const navigate = useNavigate()

   const { mutateAsync: createAsync } = useMutation(
		'create actor',
		() => ActorService.create(),
		{
			onError() {
        MyToast('Error create', false)
			},
			onSuccess(data) {
        MyToast('Create was successful', true)
        navigate(getAdminUrl(`actors/${data}`))
			},
		})

    const { mutateAsync: deleteAsync } = useMutation(
      'delete actor',
      (actorId: string) => ActorService.delete(actorId),
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
      createAsync
    }), [createAsync, deleteAsync, queryData, searchTerm])
}