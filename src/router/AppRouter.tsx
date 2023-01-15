import { FC } from 'react'
import { Route, Routes } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { adminRoutes, authRoutes, publicRoutes } from './Routes'

const AppRouter:FC = () => {
  const {user} = useAuth()

  return (
    <Routes>
      {publicRoutes.map(route => <Route key={route.path} path={route.path} element={<route.Component />}/>)}
      {user && authRoutes.map(route => <Route key={route.path} path={route.path} element={<route.Component />}/>)}
      {user?.isAdmin === true && adminRoutes.map(route => <Route key={route.path} path={route.path} element={<route.Component />}/>)}
    </Routes>
  )
}

export default AppRouter