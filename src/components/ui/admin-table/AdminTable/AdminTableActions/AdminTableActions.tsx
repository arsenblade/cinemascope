import { FC } from 'react'
import { useNavigate } from 'react-router'
import MaterialIcon from '../../../MaterialIcon'
import styles from './AdminTableActions.module.scss'

interface IAdminActions {
  editUrl: string,
  removeHandler: () => void
}

const AdminTableActions:FC<IAdminActions> = ({editUrl, removeHandler}) => {
  const navigate = useNavigate()

  return (
    <div className={styles.actions}>
      <button onClick={() => navigate(editUrl)}>
        <MaterialIcon name='MdEdit' />
      </button>
      <button onClick={removeHandler }>
        <MaterialIcon name='MdClose' />
      </button>
    </div>
  )
}

export default AdminTableActions