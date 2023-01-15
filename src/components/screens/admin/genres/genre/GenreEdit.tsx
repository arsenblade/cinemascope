import { useForm } from 'react-hook-form'
import { IGenre } from '../../../../../types/movies/movie.types'
import AdminNavigation from '../../../../ui/admin-navigation/AdminNavigation'
import { useGenresEdit } from './useGenreEdit'
import formStyles from '../../../../ui/form-element/admin-form.module.scss'
import SkeletonLoader from '../../../../ui/SkeletonLoader'
import Field from '../../../../ui/form-element/Field'
import SlugField from '../../../../ui/form-element/SlugField/SlugField'
import generateSlug from '../../../../../utils/generateSlug'
import TextEditor from '../../../../ui/form-element/TextEditor'
import Button from '../../../../ui/form-element/Button'
import styles from './GenreEdit.module.scss'


const GenreEdit = () => {
  const {handleSubmit, register, formState: {errors}, setValue, getValues, control} = useForm<IGenre>({
    mode: 'onChange'
  })

  const {isLoading, onSubmit} = useGenresEdit(setValue)

  return (
    <div>
      <AdminNavigation />
      <h1 className={styles.header}>Edit genre</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
        {isLoading ?
          <div className={styles.loaderContainer}>
            <SkeletonLoader count={4} className={styles.loader}/>
          </div>
        :
          <>
            <div className={formStyles.fields}>
              <Field
                {...register('name', {required: 'Name is required'})}
                placeholder='Name'
                error={errors.name}
                style={{width: '31%'}}
              />

              <div style={{width: '31%'}}>
                <SlugField
                  register={register}
                  error={errors.slug}
                  generate={() => setValue('slug', generateSlug(getValues('name')))}
                />
              </div>

              <Field
                {...register('icon', {required: 'Icon is required'})}
                placeholder='Icon'
                error={errors.icon}
                style={{width: '31%'}}
              />
            </div>

            <TextEditor
              {...register('description', {required: 'Description is required'})}
              placeholder='Description'
              error={errors.description}
            />
            <Button>Update</Button>
          </>
        }
      </form>
    </div>
  )
}

export default GenreEdit