import { ChangeEvent, FC } from 'react'
import MaterialIcon from '../MaterialIcon'
import styles from './SearchField.module.scss'

interface SearchFieldProps {
  searchTerm: string,
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void
}

const SearchField:FC<SearchFieldProps> = ({searchTerm, handleSearch}) => {
  return (
    <div className={styles.search}>
      <MaterialIcon name='MdSearch' />
      <input type='text' value={searchTerm} onChange={handleSearch} />
    </div>
  )
}

export default SearchField