import { FC } from 'react'
import { useQuery } from 'react-query'
import { MovieService } from '../../../../../service/movie.service'
import styles from '../AdminIndex.module.scss'
import cn from 'classnames'
import SkeletonLoader from '../../../../ui/SkeletonLoader'
import { Link } from 'react-router-dom'
import { getMoviesUrl } from '../../../../../constant/serverPath'


const PopularMovies:FC = () => {
  const {data, isLoading} = useQuery('PopularMovies',() => MovieService.getAll())

  const mostPopularMovie = data?.reduce((movie1, movie2) => {
    return (movie1.countOpened > movie2.countOpened ? movie1 : movie2)
  })

  return (
    <div className={cn(styles.block, styles.popular)}>
      <h1>The most popular movie</h1>
      {isLoading ?
        <SkeletonLoader className={styles.loaderPopular} />
      :
        mostPopularMovie &&
        <>
          <h3>Opened {mostPopularMovie.countOpened} times</h3>
          <Link to={getMoviesUrl(mostPopularMovie.slug)}>
            <img
              src={mostPopularMovie.bigPoster} 
              alt='Most popular movie.' 
              width={285} 
              height={176} 
              draggable={false}/>
          </Link>
        </>
      }
    </div>
  )
}

export default PopularMovies