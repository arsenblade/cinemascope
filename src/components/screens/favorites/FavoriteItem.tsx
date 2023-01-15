
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getMoviesUrl } from '../../../constant/serverPath'
import { useAuth } from '../../../hooks/useAuth'
import { IMovie } from '../../../types/movies/movie.types'
import FavoriteButton from '../movie/Content/ContentList/FavoriteButton/FavoriteButtton'
import styles from './Favorites.module.scss'

interface IFavoriteItem {
  movie: IMovie
}

const FavoriteItem:FC<IFavoriteItem> = ({movie}) => {
  const {user} = useAuth()
  return (
    <div className={styles.itemWrapper}>
      { user && <FavoriteButton movieId={movie.id} /> }
      <Link to={getMoviesUrl(movie.slug)} className={styles.item}>
        <img 
          alt={movie.title}
          src={movie.bigPoster}
          draggable={false}
          width={248}
          height={176}
          />
      </Link>
    </div>
  )
}

export default FavoriteItem