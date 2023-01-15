import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IMovieList } from './movie-list.interface'
import MoviesItem from './MoviesItem'
import styles from './MoviesList.module.scss'

const MoviesList:FC<IMovieList> = ({link, movies, title}) => {
  return (
    <div className={styles.list}>
      <div className={styles.heading}>
        {title}
      </div>
      {movies.map(movie => <MoviesItem key={movie.id} movie={movie} />)}
      <Link to={link} className={styles.button}>
        All {title}
      </Link>
    </div>
  )
}

export default MoviesList