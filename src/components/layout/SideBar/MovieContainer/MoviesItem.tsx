import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getGenresUrl, getMoviesUrl } from '../../../../constant/serverPath'
import { IMovie } from '../../../../types/movies/movie.types'
import { getGenresListEach } from '../../../../utils/genreUtils'
import { ratingCalculation } from '../../../../utils/ratingCalculation'
import MaterialIcon from '../../../ui/MaterialIcon'
import styles from './MoviesList.module.scss'

interface MovieItemProps {
  movie: IMovie
}

const MoviesItem:FC<MovieItemProps> = ({movie}) => {
  return (
    <div className={styles.item}>
      <Link to={getMoviesUrl(movie.slug)}>
        <img src={movie.poster} alt="Movie poster" draggable={false} width={65} height={97} />
      </Link>
      <div className={styles.info}>
        <div className={styles.title}>
          {movie.title}
        </div>
        <div className={styles.genres}>
          {movie.genres.map((genre, idx) => <Link key={genre.id} to={getGenresUrl(genre.slug)}>
            {getGenresListEach(idx, movie.genres.length, genre.name)}
          </Link>)}
        </div>
        <div className={styles.rating}>
          <MaterialIcon name='MdStarRate' />
          <span>{ratingCalculation(movie.rating).toFixed(1)}</span>
        </div>
      </div>
    </div>
  )
}

export default MoviesItem