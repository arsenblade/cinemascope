import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router"
import { getAdminUrl } from "../../../../constant/routesPath"
import { useDebounce } from "../../../../hooks/useDebounce"
import { GenreService } from "../../../../service/genre.service"
import { IGenre } from "../../../../types/movies/movie.types"
import { ITableItem } from "../../../ui/admin-table/AdminTable/admin-table.interface"
import { MyToast } from "../../../ui/toast/MyToast"

export const useGenres = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(['genre list', debouncedSearch], () => 
  GenreService.getAll((debouncedSearch)), {
    select: (data) => data.map((genre):ITableItem => ({
      id: genre.id,
      editUrl: getAdminUrl(`genres/${genre.id}`),
      items: [genre.name, genre.slug]
    })),
    onError: () => {
      MyToast('Error genre list', false)
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

   const navigate = useNavigate()

   const { mutateAsync: createAsync } = useMutation(
		'create genre',
		() => GenreService.create(),
		{
			onError() {
        MyToast('Error create', false)
			},
			onSuccess(data) {
        MyToast('Create was successful', true)
        navigate(getAdminUrl(`genres/${data}`))
			},
		})

    const { mutateAsync: deleteAsync } = useMutation(
      'delete genre',
      (genreId: string) => GenreService.delete(genreId),
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