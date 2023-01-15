import { FC } from 'react'
import { useSearch } from './useSearch'
import styles from './Search.module.scss'
import SearchField from '../../../ui/search-field/SearchField'
import SearchList from './SearchList/SearchList'

const Search:FC = () => {
  const {data, handleSearch, isSuccess, searchTerm} = useSearch()

  return (
    <div className={styles.wrapper}>
      <SearchField handleSearch={handleSearch} searchTerm={searchTerm}/>
      {isSuccess && <SearchList movies={data || []} />}
    </div>
  )
}

export default Search