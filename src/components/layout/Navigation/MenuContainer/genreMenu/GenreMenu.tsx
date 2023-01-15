import { FC } from 'react'
import SkeletonLoader from '../../../../ui/SkeletonLoader'
import Menu from '../Menu'
import { usePopularGenre } from './usePopularGenre'
import styles from './GenreMenu.module.scss'

const GenreMenu:FC = () => {
  const {data, isLoading} = usePopularGenre()
  return (
    isLoading ?
    <div className={styles.loaderContainer}>
      <SkeletonLoader count={4} className={styles.loader} />
    </div>
    : <Menu menu={{items: data || [], title: 'Popular Genre'}} />
  )
}

export default GenreMenu