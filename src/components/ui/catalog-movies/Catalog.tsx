
import { FC } from 'react'
import { getMoviesUrl } from '../../../constant/serverPath'
import { IMovie } from '../../../types/movies/movie.types'
import GalleryItem from '../gallery/GalleryItem'

import styles from './Catalog.module.scss'


export interface ICatalog {
  title: string,
  description?: string,
  movies: IMovie[]
}

const Catalog:FC<ICatalog> = ({movies, title, description}) => {
  return (
    <>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <section className={styles.movies}>
        {movies.map(movie => <GalleryItem 
          key={movie.id} 
          height={176}
          width={248}
          item={{
          name: movie.title,
          link: getMoviesUrl(movie.slug),
          posterPath: movie.bigPoster,
          content: {
            title: movie.title
          }
        }} variant='horizontal'/>)}
      </section>
    </>
  )
}

export default Catalog