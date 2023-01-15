import Collections from '../../ui/collections/Collections'
import { useDiscovery } from './useDiscovery'

const Discovery = () => {
  const {genreDiscovery, isLoading} = useDiscovery()

  return (
    <Collections
      collections={genreDiscovery}
    />
  )
}

export default Discovery