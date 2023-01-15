import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { INavItem } from './admin-navigation.data'
import cn from 'classnames'
import styles from './AdminNavigation.module.scss'

const AdminNavItem:FC<INavItem> = ({link, title}) => {
  const {pathname} = useLocation()

  return (
    <li>
      <Link to={link}
        className={cn({
          [styles.active]: link === pathname
        })}
      >
        {title}
      </Link>
    </li>
  )
}

export default AdminNavItem