import React from 'react'
import Catalog from '../../ui/catalog-movies/Catalog'
import { useFresh } from './useFresh'

const Fresh = () => {
  const {dataMovie, isLoading} = useFresh()

  return (
    <Catalog 
      movies={dataMovie}
      title='Fresh movies'
      description='New movies and series in excellent quality: legal, safe, without ads'
    />
  )
}

export default Fresh