import { FC } from 'react'
import SkeletonLoader from '../../ui/SkeletonLoader'
import FavoriteItem from './FavoriteItem'
import styles from './Favorites.module.scss'
import { useFavorites } from './useFavorites'

const Favorites:FC = () => {

  const {isLoading, favoritesMovies} = useFavorites()

  return (
    <>
      <h1 className={styles.heading}>Favorites</h1>

      <section className={styles.favorites}>
        {isLoading ?
        <SkeletonLoader count={3} className={styles.skeletonLoader} containerClassName={styles.containerLoader} />
        :
        favoritesMovies?.map(favMovie => <FavoriteItem key={favMovie.id} movie={favMovie}/>)
        }
      </section>
    </>
  )
}

export default Favorites