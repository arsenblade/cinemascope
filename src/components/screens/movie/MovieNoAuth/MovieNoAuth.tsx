import { FC } from 'react'

import styles from './MovieNoAuth.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { getHomeUrl } from '../../../../constant/routesPath'

const MovieNoAuth: FC<{ slug: string }> = ({ slug }) => {
  const location = useLocation()

  const redirectStorage = () => {
    localStorage.setItem('redirect', location.pathname)
  }

	return (
		<div className={styles.placeholder}>
			<div>
				<div>You must be logged in to start watching</div>
        <Link to={getHomeUrl('auth')} className={styles.btn} onClick={redirectStorage}>
          Sign in
        </Link>
			</div>
		</div>
	)
}

export default MovieNoAuth
