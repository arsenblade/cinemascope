import React from 'react'
import AdminNavigation from '../../../ui/admin-navigation/AdminNavigation'
import AdminHeader from '../../../ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '../../../ui/admin-table/AdminTable/AdminTable'
import styles from './UserList.module.scss'
import { useUsers } from './useUsers'

const UsersList = () => {
  const {handleSearch, isLoading, searchTerm, deleteAsync, data} = useUsers()
  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.header}>Users</h1>
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm}/>
      <AdminTable isLoading={isLoading} headerItems={['Email', 'Date register']} removeHandler={deleteAsync}  tableItems={data || []}/>
    </div>
  )
}

export default UsersList