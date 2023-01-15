import { ChangeEvent, useState } from "react"
import { useQuery } from "react-query"
import { useDebounce } from "../../../../hooks/useDebounce"
import { MovieService } from "../../../../service/movie.service"

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)

  const {isSuccess, data} = useQuery(['search film', debouncedSearch], () => MovieService.getAll((debouncedSearch)), {
    enabled: !!debouncedSearch
  })

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return {isSuccess, data, handleSearch, searchTerm}
}