import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getMoviesUrl } from '../../../../../constant/serverPath'
import { IMovie } from '../../../../../types/movies/movie.types'
import styles from './SearchList.module.scss'

interface SearchListProps {
  movies: IMovie[]
}

const SearchList:FC<SearchListProps> = ({movies}) => {
  return (
    <div className={styles.searchList}>
      {movies.length ? movies.map(movie => 
      <Link key={movie.id} to={getMoviesUrl(movie.slug)}>
        <img src={movie.poster}  alt="Film" width={40} height={60} draggable={false}/>
        <span>{movie.title}</span>
      </Link>) : 
      <div className={styles.noMovies}> 
        Movies not found!
      </div>}
    </div>
  )
}

export default SearchList