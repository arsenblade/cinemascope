import { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IMenuItem } from './Menu.interface'
import styles from './Menu.module.scss'
import cn from 'classnames'
import MaterialIcon from '../../../ui/MaterialIcon'

interface MenuItemProps {
  menuItem: IMenuItem
}

const MenuItem:FC<MenuItemProps> = ({menuItem: {icon, title, link}}) => {
  const {pathname} = useLocation()
  return (
    <li className={cn({
      [styles.active]: pathname === link
    })}>
      <Link to={link}>
        <MaterialIcon name={icon} />
        <span>
          {title}
        </span>
      </Link> 
    </li>
  )
}

export default MenuItem