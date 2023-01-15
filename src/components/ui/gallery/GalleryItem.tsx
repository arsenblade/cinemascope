
import { FC } from 'react'
import cn from 'classnames'

import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'
import { Link } from 'react-router-dom'

const GalleryItem:FC<IGalleryItemProps> = ({item, variant, height = 290, width = 165}) => {
  return (
    <Link to={item.link}
      className={cn(styles.item, {
        [styles.withText]: item.content,
        [styles.horizontal]: variant === 'horizontal',
        [styles.vertical]: variant === 'vertical'
      })}
    >
        <img
          alt={item.name}
          src={item.posterPath}
          draggable={false}
          width={width}
          height={height}
        />
        {item.content && (
          <div className={styles.content}>
            <div className={styles.title}>
              {item.content.title}
            </div>
            {item.content.subTitle && 
              <div className={styles.subTitle}>{item.content.subTitle}</div>
            }
          </div>
        )}
    </Link>
  )
}

export default GalleryItem