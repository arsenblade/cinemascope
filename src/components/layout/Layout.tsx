import { FC } from 'react'
import Navigation from './Navigation/Navigation'
import styles from './Layout.module.scss'
import SideBar from './SideBar/SideBar'
import { useLocation } from 'react-router'

interface LayoutProps {
  children: React.ReactNode
}

const Layout:FC<LayoutProps> = ({children}) => {
  return (
    <div className={styles.layout}>
      <Navigation />
      <div className={styles.center}>
        {children}
      </div>
      <SideBar />
    </div>
  )
}

export default Layout