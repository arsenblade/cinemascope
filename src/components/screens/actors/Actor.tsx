import Catalog from "../../ui/catalog-movies/Catalog"
import { useActor } from "./useActor"


const Actor = () => {
  const {data, isLoading} = useActor()

  return (
    <Catalog
      movies={data?.dataMovies || []}
      title={data ? data.dataActor.name : ''}
    />
  )
}

export default Actor