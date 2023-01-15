
import { FC } from 'react'
import { IBanner } from './banner.interface'
import styles from './Banner.module.scss'

const Banner:FC<IBanner> = ({image, Detail}) => {
  return (
    <div className={styles.banner}>
      <img
        alt=''
        src={image}
        draggable={false}
        className={styles.image}
        height={320}
      />
      {Detail && <Detail />}
    </div>
  )
}

export default Banner