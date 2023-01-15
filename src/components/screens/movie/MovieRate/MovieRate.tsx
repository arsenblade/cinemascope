import { FC } from 'react'
import StarRating from 'react-star-ratings'
import { useAuth } from '../../../../hooks/useAuth'
import { useRateMovie } from './useMovieRate'
import styles from './MovieRate.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { getHomeUrl } from '../../../../constant/routesPath'

interface IMovieRate {
  movieId: string,
  slug: string
}

const MovieRate:FC<IMovieRate> = ({movieId, slug}) => {
  const {user} = useAuth()
  const location = useLocation()

  const {handleClick, rating, isSended} = useRateMovie(movieId)
  const redirectStorage = () => {
    localStorage.setItem('redirect', location.pathname)
  }

  return (
    <div className={styles.wrapper}>
      <h3>How do you like the movie?</h3>
      <p>Ratings improve recommendation</p>
      {user ?
        <>
          {isSended ? (
            <>
              <div className={styles.thanks}>Thanks for rating!</div>
            </>)
          : 
            <StarRating name='star-rating' rating={rating} changeRating={handleClick} starEmptyColor='4f4f4f'/>}
        </>
      : 
        <Link to={getHomeUrl('auth')} className={styles.btn} onClick={redirectStorage}>
          Sign in
        </Link>
      }
    </div>
  )
}

export default MovieRate