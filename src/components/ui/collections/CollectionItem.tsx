import cn from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getGenresUrl } from '../../../constant/serverPath'
import { ICollections } from './collections.interface'

import styles from './Collections.module.scss'

const CollectionItem:FC<{collection: ICollections}> = ({collection}) => {
  return (
    <Link to={getGenresUrl(collection.slug)} className={styles.collection}>
        <img src={collection.image} alt={collection.title} width={248} height={176}/>
        <div className={styles.content}>
          <div className={styles.title}>{collection.title}</div>
        </div>

        <div className={cn(styles.behind, styles.second)}>
            <img src={collection.image} alt={collection.title} width={248} height={176}/>
        </div>

        <div className={cn(styles.behind, styles.third)}>
            <img src={collection.image} alt={collection.title} width={248} height={176}/>
        </div>
    </Link>
  )
}

export default CollectionItem