import { FC } from 'react'
import { IMenu } from './Menu.interface'
import MenuItem from './MenuItem'
import styles from './Menu.module.scss'
import AuthMenu from './authMenu/AuthMenu'
interface MenuProps {
  menu: IMenu
}

const Menu:FC<MenuProps> = ({menu: {items, title}}) => {
  return (
    <div className={styles.menu}>
      <div className={styles.heading}>{title}</div>
      <ul className={styles.ul}>
        {items.map(item => (
          <MenuItem  menuItem={item} key={item.link}/>
        ))}
        {title === 'General' ? <AuthMenu /> : null}
      </ul>
    </div>
  )
}

export default Menu