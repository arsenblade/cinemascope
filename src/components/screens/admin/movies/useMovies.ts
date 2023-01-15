import { ChangeEvent, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useNavigate } from "react-router"
import { getAdminUrl } from "../../../../constant/routesPath"
import { useDebounce } from "../../../../hooks/useDebounce"
import { MovieService } from "../../../../service/movie.service"
import { getGenresList } from "../../../../utils/genreUtils"
import { ratingCalculation } from "../../../../utils/ratingCalculation"
import { ITableItem } from "../../../ui/admin-table/AdminTable/admin-table.interface"
import { MyToast } from "../../../ui/toast/MyToast"

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const queryData = useQuery(['movie list', debouncedSearch], () => 
  MovieService.getAll((debouncedSearch)), {
    select: (data) => data.map((movie):ITableItem => ({
      id: movie.id,
      editUrl: getAdminUrl(`movies/${movie.id}`),
      items: [movie.title, getGenresList(movie.genres), String(ratingCalculation(movie.rating))]
    })),
    onError: () => {
      MyToast('Error movie list', false)
    }
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

   const navigate = useNavigate()

   const { mutateAsync: createAsync } = useMutation(
		'create movie',
		() => MovieService.create(),
		{
			onError() {
        MyToast('Error create', false)
			},
			onSuccess(data) {
        MyToast('Create was successful', true)
        navigate(getAdminUrl(`movies/${data}`))
			},
		})

    const { mutateAsync: deleteAsync } = useMutation(
      'delete movie',
      (movieId: string) => MovieService.delete(movieId),
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