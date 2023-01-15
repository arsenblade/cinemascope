
import { FC, memo } from 'react'
import { getActorsUrl, getGenresUrl } from '../../../../constant/serverPath'
import { useAuth } from '../../../../hooks/useAuth'
import { ratingCalculation } from '../../../../utils/ratingCalculation'
import MaterialIcon from '../../../ui/MaterialIcon'
import { IContent } from './content.interface'
import styles from './Content.module.scss'
import ContentList from './ContentList/ContentList'
import FavoriteButton from './ContentList/FavoriteButton/FavoriteButtton'

const Content:FC<IContent> = memo(({movie}) => {
  const {user} = useAuth()
  if(!movie) {
    return null
  }
  
  return (
    <div className={styles.content}>
      <h1>{movie.title}</h1>
      <div className={styles.details}>
        <span>{movie.parameters.year} · </span>
        <span>{movie.parameters.country} · </span>
        <span>{movie.parameters.duration} min.</span>
      </div>
      <ContentList links={movie.genres.slice(0, 3).map(g => ({
        id: g.id,
        link: getGenresUrl(g.slug),
        title: g.name,
      }))}  name='Genres'/>

      <ContentList links={movie.actors.slice(0, 3).map(a => ({
        id: a.id,
        link: getActorsUrl(a.slug),
        title: a.name,
      }))}  name='Actors'/>

      <div className={styles.rating}>
        <MaterialIcon name='MdStarRate' />
        <span>{ratingCalculation(movie.rating).toFixed(1)}</span>
      </div>
      {user &&
      <FavoriteButton movieId={movie.id}/>}
    </div>
  )
})

export default Content