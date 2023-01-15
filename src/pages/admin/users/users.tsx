import { FC } from 'react'
import AdminIndex from '../../../components/screens/admin/home/AdminIndex'
import UsersList from '../../../components/screens/admin/users/UserList'

const AdminUsersPage:FC = () => {
  return (
    <div>
       <UsersList />
    </div>
  )
}

export default AdminUsersPage