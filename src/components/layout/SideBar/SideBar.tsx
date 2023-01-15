import { FC } from 'react'
import MovieContainer from './MovieContainer/MovieContainer'
import Search from './Search/Search'
import styles from './SideBar.module.scss'

const SideBar:FC = () => {
  return (
    <div className={styles.sidebar}>
      <Search />
      <MovieContainer />
    </div>
  )
}

export default SideBar