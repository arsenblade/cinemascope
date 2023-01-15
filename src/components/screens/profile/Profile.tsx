import { useForm } from 'react-hook-form'
import { IUser } from '../../../types/user.types'
import formStyles from '../../ui/form-element/admin-form.module.scss'
import { useProfile } from './useProfile'
import styles from './Profile.module.scss'
import SkeletonLoader from '../../ui/SkeletonLoader'
import AuthFields from '../auth/AuthFields'
import Button from '../../ui/form-element/Button'

const Profile = () => {
  const {handleSubmit, register, formState, setValue} = useForm<IUser>({
    mode: 'onChange'
  })
  const {isLoading, onSubmit} = useProfile(setValue)

  return (
    <div>
      <h1 className={styles.header}>Edit user</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ?
          <SkeletonLoader count={2} className={styles.loader}/>
        :
          <>
            <AuthFields register={register} formState={formState}  />

            <Button>Update</Button>
          </>
        }
      </form>
    </div>
  )
}

export default Profile