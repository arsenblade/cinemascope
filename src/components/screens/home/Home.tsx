import { FC } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import styles from './Home.module.scss'
import 'react-toastify/dist/ReactToastify.css'
import { useHome } from './useHome';
import Slider from '../../ui/slider/Slider';
import SkeletonLoader from '../../ui/SkeletonLoader';
import Gallery from '../../ui/gallery/Gallery';

const Home:FC = () => {

  const {isLoadingActor, isLoadingMovie, bestActors, slides, popularMovies} = useHome()


  return (
    <div>
      <h1 className={styles.header}>Watch movies online</h1>
      {isLoadingMovie ?
        <SkeletonLoader count={2} className={styles.loader} />
      :
        <>
          {slides.length && <Slider slides={slides} />}
          <div className={styles.containerPopularMovies}>
            <h1 className={styles.header}>Trending now</h1>
            {popularMovies.length && <Gallery items={popularMovies} />}
          </div>
        </>
      }

      {isLoadingActor ?
        null
      :
        <div className={styles.containerBestActors}>
          <h1 className={styles.header}>Best actors</h1>
          {bestActors.length && <Gallery items={bestActors} />}
        </div>
      }
    </div>
  )
}

export default Home