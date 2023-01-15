import { FC } from 'react'
import AdminNavigation from '../../../ui/admin-navigation/AdminNavigation'

import styles from './AdminIndex.module.scss'
import Statistics from './statistics/Statistics'

const AdminIndex:FC = () => {
  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.heading}>Some statistics</h1>
      <Statistics />
    </div>
  )
}

export default AdminIndex