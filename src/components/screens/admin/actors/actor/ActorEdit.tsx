import { useForm } from 'react-hook-form'
import { IActor } from '../../../../../types/movies/movie.types'
import AdminNavigation from '../../../../ui/admin-navigation/AdminNavigation'
import formStyles from '../../../../ui/form-element/admin-form.module.scss'
import SkeletonLoader from '../../../../ui/SkeletonLoader'
import Field from '../../../../ui/form-element/Field'
import SlugField from '../../../../ui/form-element/SlugField/SlugField'
import generateSlug from '../../../../../utils/generateSlug'
import Button from '../../../../ui/form-element/Button'
import styles from './ActorEdit.module.scss'
import { useActorEdit } from './useActor'


const ActorEdit = () => {
  const {handleSubmit, register, formState: {errors}, setValue, getValues, control} = useForm<IActor>({
    mode: 'onChange'
  })

  const {isLoading, onSubmit} = useActorEdit(setValue)

  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.header}>Edit genre</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ?
          <div className={styles.loaderContainer}>
            <SkeletonLoader count={3} className={styles.loader}/>
          </div>
        :
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('name', {required: 'Name is required'})}
                placeholder='Name'
                error={errors.name}
              />

              <SlugField
                register={register}
                error={errors.slug}
                generate={() => setValue('slug', generateSlug(getValues('name')))}
              />

              <Field
                {...register('photo', {required: 'Name photo is required'})}
                placeholder='Photo'
                error={errors.photo}
              />
            </div>
            <Button>Update</Button>
          </>
        }
      </form>
    </div>
  )
}

export default ActorEdit