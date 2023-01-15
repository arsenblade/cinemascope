import { FC, Fragment, memo } from 'react'
import { Link } from 'react-router-dom'
import { IContentList } from '../content.interface'

import styles from './ContentList.module.scss'

const ContentList:FC<IContentList> = memo(({name, links}) => {
  return (
    <div className={styles.list}>
      <div className={styles.name}>{name}</div>
      <div className={styles.links}>
        {links.map((link, idx) => <Fragment key={link.id}>
          <Link to={link.link}>
            {link.title}
          </Link>
          {idx !== links.length - 1 ? ', ' : ''}
        </Fragment>)}
      </div>
    </div>
  )
})

export default ContentList