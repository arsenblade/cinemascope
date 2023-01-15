import Banner from "../../ui/banner/Banner"
import Gallery from "../../ui/gallery/Gallery"
import Content from "./Content/Content"
import styles from './Movie.module.scss'
import { useMovie } from "./useMovie"
import ReactPlayer from 'react-player'
import { memo, useCallback, useState } from "react"
import MovieRate from "./MovieRate/MovieRate"
import { useAuth } from "../../../hooks/useAuth"
import MovieNoAuth from "./MovieNoAuth/MovieNoAuth"
import { useParams } from "react-router"
import { useCountOpened } from "./useCountOpened"


const Movie = memo(() => {
  const params = useParams()
  const {dataMovie, isLoadingMovies, similarMovies} = useMovie()
  const [isPlaying, setIsPlaying] =  useState(false)
  const {user} = useAuth()
  const detail = useCallback(() => <Content movie={dataMovie || null} />, [dataMovie])
  useCountOpened(params.slug)

  
  return (
      <>
        { !isLoadingMovies && dataMovie ? 
        <>
          <Banner image={dataMovie.bigPoster} Detail={detail} />
          {user ?  
            <div className={styles.containerPlayer}>
              <ReactPlayer 
                style={{margin: '0 auto'}} 
                width={832} height={468} 
                url={dataMovie.videoUrl} 
                playing={isPlaying} 
                playIcon={<button className={styles.playButton} 
                onClick={() => setIsPlaying(true)}></button>} 
                light={dataMovie.bigPoster} 
                controls={true} 
                volume={0.5}/>
            </div>
          : 
            <div className={styles.containerPlayer}>
              <MovieNoAuth slug={dataMovie.slug} />
            </div>

          }
          <div className={styles.similarContainer}>
            <h2 className={styles.heading}>Similar</h2>
            <Gallery items={similarMovies} />
          </div>

          <MovieRate movieId={dataMovie.id} slug={dataMovie.slug} />
        </>
      : null}
      </>
  )
})

export default Movie