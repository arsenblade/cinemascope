import { Controller, useForm } from 'react-hook-form'
import AdminNavigation from '../../../../ui/admin-navigation/AdminNavigation'
import formStyles from '../../../../ui/form-element/admin-form.module.scss'
import SkeletonLoader from '../../../../ui/SkeletonLoader'
import Button from '../../../../ui/form-element/Button'
import styles from './UserEdit.module.scss'
import { useUserEdit } from './useUserEdit'
import { IUser } from '../../../../../types/user.types'
import AuthFields from '../../../auth/AuthFields'
import { useAuth } from '../../../../../hooks/useAuth'


const UserEdit = () => {
  const {handleSubmit, register, formState, setValue, control} = useForm<IUser>({
    mode: 'onChange'
  })
  const {isLoading, onSubmit, data} = useUserEdit(setValue)
  const {user} = useAuth()


  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.header}>Edit user</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ?
          <div className={styles.loaderContainer}>
            <SkeletonLoader count={3} className={styles.loader} />
          </div>
        :
          <>
            <AuthFields register={register} formState={formState}  />
            {data?.data.id !== user?.id ?             
              <Controller
                control={control} 
                name='isAdmin' 
                render={({field}) => (
                  <button className={styles.button} onClick={(e) => {
                    e.preventDefault()
                    field.onChange(!field.value)
                  }}>
                    {field.value ? 'Make it regular user' : 'Make it admin'}
                  </button>
                )}
              ></Controller> 
            : 
              null}

            <Button>Update</Button>
          </>
        }
      </form>
    </div>
  )
}

export default UserEdit