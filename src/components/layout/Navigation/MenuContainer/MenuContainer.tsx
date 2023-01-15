import { FC } from 'react'
import Menu from './Menu'
import { firstMenu, UserMenu } from './menuData'
import styles from './MenuContainer.module.scss'
import GenreMenu from './genreMenu/GenreMenu'

const MenuContainer:FC = () => {
  return (
    <div>
      <Menu menu={firstMenu} />
      <GenreMenu />
      <Menu menu={UserMenu} />
    </div>
  )
}

export default MenuContainer