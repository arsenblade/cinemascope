import Catalog from "../../../ui/catalog-movies/Catalog"
import { useGenre } from "./useGenre"


const Genre = () => {
  const {data, isLoading} = useGenre()

  return (
    <Catalog
      movies={data?.dataMovies || []}
      title={data ? data.dataGenre.name : ''}
      description={data ? data.dataGenre.description : ''}
    />
  )
}

export default Genre