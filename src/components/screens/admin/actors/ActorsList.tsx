import React from 'react'
import AdminNavigation from '../../../ui/admin-navigation/AdminNavigation'
import AdminHeader from '../../../ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '../../../ui/admin-table/AdminTable/AdminTable'
import styles from './ActorsList.module.scss'
import { useActors } from './useActors'

const ActorsList = () => {
  const {handleSearch, isLoading, searchTerm, deleteAsync, data, createAsync} = useActors()
  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.header}>Actors</h1>
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} onClick={createAsync}/>
      <AdminTable isLoading={isLoading} headerItems={['Name', 'Count movies']} removeHandler={deleteAsync}  tableItems={data || []}/>
    </div>
  )
}

export default ActorsList