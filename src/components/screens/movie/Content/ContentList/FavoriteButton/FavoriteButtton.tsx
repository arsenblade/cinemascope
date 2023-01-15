import cn from 'classnames'
import { FC, memo, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { UserService } from '../../../../../../service/user.service'
import { MyToast } from '../../../../../ui/toast/MyToast'
import { useFavorites } from '../../../../favorites/useFavorites'

import styles from './FavoriteButton.module.scss'
interface IFavoriteButton {
  movieId: string
}

const FavoriteButton:FC<IFavoriteButton> = memo(({movieId}) => {
  const [isSmashed, setIsSmashed] = useState(false)

  const {favoritesMovies, refetch, dataUser} = useFavorites()

  useEffect(() => {
    if(!favoritesMovies) return

    const isHasMovie = favoritesMovies.some(m => m.id === movieId)
    if(isHasMovie !== isSmashed) setIsSmashed(isHasMovie) 
  }, [favoritesMovies, isSmashed, movieId])

  const {mutateAsync} = useMutation('update favorites', () => UserService.toggleFavorite(movieId, dataUser), {
    onSuccess: () => {
      setIsSmashed(!isSmashed)
      refetch()
    },
    onError:() => {
      MyToast('Update favorite list', false)
    },
  })

  return (
    <button onClick={() => mutateAsync()} 
      className={cn(styles.button, {
        [styles.animate]: isSmashed
      })}
      style={{backgroundImage: `url('/heart-animation.png')`, backgroundPosition: 'left'}}
    />
  )
})

export default FavoriteButton