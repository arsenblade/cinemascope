import { FC } from 'react'
import CollectionItem from './CollectionItem'
import { ICollections } from './collections.interface'

import styles from './Collections.module.scss'


const Collections:FC<{collections: ICollections[]}> = ({collections}) => {

  return (
    <>
      <h1 className={styles.heading}>Discovery</h1>
      <p className={styles.description}>In this section you will find all genres on our site</p>

      <section className={styles.collections}>
        {collections.map((c) => (
          <CollectionItem key={c.id} collection={c} />
        ))}
      </section>
    </>
  )
}

export default Collections