import { FC } from 'react'
import CountUsers from './CountUsers'
import PopularMovies from './PopularMovies'
import styles from '../AdminIndex.module.scss'

const Statistics:FC = () => {
  return (
    <div className={styles.statistics}>
    <CountUsers />
    <PopularMovies />
  </div>
  )
}

export default Statistics