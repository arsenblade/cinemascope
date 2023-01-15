import React from 'react'
import AdminNavigation from '../../../ui/admin-navigation/AdminNavigation'
import AdminHeader from '../../../ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '../../../ui/admin-table/AdminTable/AdminTable'

import styles from './MoviesAdminList.module.scss'
import { useMovies } from './useMovies'

const MoviesAdminList = () => {
  const {handleSearch, isLoading, searchTerm, deleteAsync, data, createAsync} = useMovies()
  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.header}>Movies</h1>
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
      <AdminTable isLoading={isLoading} headerItems={['Title', 'Genres', 'Rating']} removeHandler={deleteAsync}  tableItems={data || []}/>
    </div>
  )
}

export default MoviesAdminList