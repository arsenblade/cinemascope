import { FC } from "react"
import { useAuth } from "../../../../../hooks/useAuth"
import { useFavorites } from "../../../../screens/favorites/useFavorites"
import SkeletonLoader from "../../../../ui/SkeletonLoader"
import MoviesList from "../MoviesList"
import styles from './FavoriteMovies.module.scss'


const FavoriteMovies:FC = () => {
  const {isLoading, favoritesMovies} = useFavorites()

  const {user} = useAuth()
  if(!user) return (
    <div className={styles.noAuth}>
      For viewing favorites plz autorize!
    </div>
  )
  return (
    isLoading ?
    <div className={styles.loaderContainer}>
      <SkeletonLoader count={4} className={styles.loader} />
    </div> 
    : 
    <MoviesList link='/favorites' movies={favoritesMovies.slice(0, 3) || []} title='Favorites'/>
  )
}

export default FavoriteMovies