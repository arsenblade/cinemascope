import React from 'react'
import AdminNavigation from '../../../ui/admin-navigation/AdminNavigation'
import AdminHeader from '../../../ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '../../../ui/admin-table/AdminTable/AdminTable'
import { useGenres } from './useGenres'
import styles from './GenreList.module.scss'

const GenresList = () => {
  const {handleSearch, isLoading, searchTerm, deleteAsync, data, createAsync} = useGenres()
  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.header}>Genres</h1>
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
      <AdminTable isLoading={isLoading} headerItems={['Title', 'SLug']} removeHandler={deleteAsync}  tableItems={data || []}/>
    </div>
  )
}

export default GenresList