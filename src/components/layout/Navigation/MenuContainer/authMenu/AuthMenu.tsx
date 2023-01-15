import { FC } from "react"
import { getAdminHomeUrl } from "../../../../../constant/routesPath"
import { useAuth } from "../../../../../hooks/useAuth"
import MenuItem from "../MenuItem"
import LogoutButton from "./LogoutButton"

const AuthMenu:FC = () => {
  const {user} = useAuth()
  return (
    <>
      {user ? 
        <>
          <MenuItem menuItem={{
            icon: 'MdSettings',
            link: '/profile',
            title: 'Profile'
          }} />
          <LogoutButton />
        </> 
      : 
        <> 
          <MenuItem menuItem={{
            icon: 'MdLogin',
            link: '/auth',
            title: 'Login'
          }} />
        </>
      }

      {user?.isAdmin && <MenuItem menuItem={{
          icon: 'MdOutlineLock',
          link: getAdminHomeUrl(),
          title: 'Admin panel'
      }} />}
    </>
  )
}

export default AuthMenu