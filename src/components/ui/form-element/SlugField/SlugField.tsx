import { FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'
import Field from '../Field'
import styles from './SlugField.module.scss'

interface SlugFieldProps {
  error?: FieldError,
  register: UseFormRegister<any>,
  generate: () => void
}

const SlugField:FC<SlugFieldProps> = ({generate, register, error}) => {
  return (
    <div className={styles.relative}>
      <Field 
        {...register('slug', {required: 'Slug is required!'})}
        placeholder='Slug'
        error={error}
      />
      <div className={styles.generateButton} onClick={generate}>
          generate
      </div>
    </div>
  )
}

export default SlugField