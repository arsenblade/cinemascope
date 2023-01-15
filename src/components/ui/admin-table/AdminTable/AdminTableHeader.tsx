import React, { FC } from 'react'
import styles from './AdminTable.module.scss'
import cn from 'classnames'

const AdminTableHeader:FC<{headerItems: string[]}> = ({headerItems}) => {
  return (
    <div className={cn(styles.item, styles.itemHeader)}>
      {headerItems.map(headerItem => <div key={headerItem}>
        {headerItem}
      </div>)}
      <div>Actions</div>
    </div>
  )
}

export default AdminTableHeader