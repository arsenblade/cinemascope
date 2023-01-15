import { FC, useCallback } from 'react'
import SkeletonLoader from '../../SkeletonLoader'
import { IAdminTable } from './admin-table.interface'
import AdminTableHeader from './AdminTableHeader'
import AdminTableItem from './AdminTableItem'
import styles from './AdminTable.module.scss'

const AdminTable:FC<IAdminTable> = ({headerItems,isLoading,removeHandler,tableItems}) => {

  return (
    <div>
      <AdminTableHeader headerItems={headerItems}/>
      {isLoading ?
        <SkeletonLoader count={1}  className={styles.loading} />
      :
        tableItems.length ?
          tableItems.map(tableItem => <AdminTableItem key={tableItem.id} removeHandler={() => removeHandler(tableItem.id)} tableItem={tableItem}/>)
        :
          <div className={styles.notFound}>Elements not found</div>
        }
    </div>
  )
}

export default AdminTable