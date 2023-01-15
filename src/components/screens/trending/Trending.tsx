import React from 'react'
import Catalog from '../../ui/catalog-movies/Catalog'
import { useTrending } from './useTrending'

const Trending = () => {
  const {dataMovie, isLoading} = useTrending()

  return (
    <Catalog 
      movies={dataMovie}
      title='Trending movies'
      description='Trending movies in excellent quality: legal, safe, without ads'
    />
  )
}

export default Trending