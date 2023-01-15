import { FC } from 'react'
import { useQuery } from 'react-query'
import { UserService } from '../../../../../service/user.service'
import SkeletonLoader from '../../../../ui/SkeletonLoader'
import styles from '../AdminIndex.module.scss'
import cn from 'classnames'

const CountUsers:FC = () => {
const {data, isLoading} = useQuery('CountUsers', () => UserService.getAll())

  return (
    <div className={cn(styles.block, styles.countUsers)}>
      <div>
        {isLoading ?
          <SkeletonLoader className={styles.loaderCountUsers} />
        :
          <div className={styles.number}>{data?.length}</div>
        }
        <div className={styles.description}>Users</div>
      </div>
    </div>
  )
}

export default CountUsers