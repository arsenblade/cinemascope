import { FC } from 'react'
import { IAdminTableItem } from './admin-table.interface'
import styles from './AdminTable.module.scss'
import AdminTableActions from './AdminTableActions/AdminTableActions'

const AdminTableItem:FC<IAdminTableItem> = ({removeHandler, tableItem}) => {
  return (
    <div className={styles.item}>
      {tableItem.items.map(item => <div key={item}>
        {item}
      </div>)}
      <AdminTableActions editUrl={tableItem.editUrl} removeHandler={removeHandler}/>
    </div>
  )
}

export default AdminTableItem