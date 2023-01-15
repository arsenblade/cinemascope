import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import generateSlug from '../../../../../utils/generateSlug'
import AdminNavigation from '../../../../ui/admin-navigation/AdminNavigation'
import Button from '../../../../ui/form-element/Button'
import Field from '../../../../ui/form-element/Field'
import SlugField from '../../../../ui/form-element/SlugField/SlugField'
import styles from './MovieEdit.module.scss'
import formStyles from '../../../../ui/form-element/admin-form.module.scss'
import Select from '../../../../ui/select/Select'
import { IOption } from '../../../../ui/select/select.interface'
import SkeletonLoader from '../../../../ui/SkeletonLoader'
import { IMovieEditInput } from './movie-edit.interface'
import { useMovieEdit } from './useMovieEdit'

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
		getValues,
	} = useForm<IMovieEditInput>({
		mode: 'onChange',
	})

	const { onSubmit, isLoading, queryActors, queryGenres } = useMovieEdit(setValue)

  const genres = queryGenres.data && queryGenres.data.map(
    (genre): IOption => ({
      label: genre.name,
      value: genre.id,
  }))

  const actors = queryActors.data && queryActors.data.map(
    (actors): IOption => ({
      label: actors.name,
      value: actors.id,
    }))
	
	return (
    <div>
      <AdminNavigation />
			<h1 className={styles.header}>Edit movie</h1>
			{isLoading ? (
				<div className={styles.loaderContainer}>
					<SkeletonLoader count={10} className={styles.loader}/>
				</div>
			) : (
				<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
					<div className={formStyles.fields}>
						<Field
							{...register('title', {
								required: 'Title is required!',
							})}
							placeholder="Title"
							error={errors.title}
						/>
						<SlugField
							generate={() =>
								setValue('slug', generateSlug(getValues('title')))
							}
							register={register}
							error={errors.slug}
						/>
						<Field
							{...register('parameters.country', {
								required: 'Country is required!',
							})}
							placeholder="Country"
							error={errors.parameters?.country}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('parameters.duration', {
								required: 'Duration is required!',
							})}
							placeholder="Duration (min.)"
							error={errors.parameters?.duration}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('parameters.year', {
								required: 'Year is required!',
							})}
							placeholder="Year"
							error={errors.parameters?.year}
							style={{ width: '31%' }}
						/>

						<Field
							{...register('poster', {
								required: 'Name poster is required!',
							})}
							placeholder="Poster"
							error={errors.poster}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('bigPoster', {
								required: 'Name big poster is required!',
							})}
							placeholder="Big Poster"
							error={errors.bigPoster}
							style={{ width: '31%' }}
						/>
						<Field
							{...register('videoUrl', {
								required: 'Name video is required!',
							})}
							placeholder="Video"
							error={errors.videoUrl}
							style={{ width: '31%' }}
						/>

						<Controller
							name="genres"
							control={control}
							rules={{
								required: 'Please select at least one genre!',
							}}
							render={({ field, fieldState: { error } }) => (
								<Select
									error={error}
									field={field}
									placeholder="Genres"
									options={genres || []}
									isLoading={queryGenres.isLoading}
									isMulti
								/>
							)}
						/>
						<Controller
							name="actors"
							control={control}
							rules={{
								required: 'Please select at least one actor!',
							}}
							render={({ field, fieldState: { error } }) => (
								<Select
									error={error}
									field={field}
									placeholder="Actors"
									options={actors || []}
									isLoading={queryActors.isLoading}
									isMulti
								/>
							)}
						/>
					</div>

					<Button>Update</Button>
				</form>
			)}
    </div>
	)
}

export default MovieEdit
