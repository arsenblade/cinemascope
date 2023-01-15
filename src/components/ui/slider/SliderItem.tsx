import { FC } from 'react'
import styles from './Slider.module.scss'
import { ISlideItem } from './slider.interface'
import { useNavigate } from 'react-router'

const SlideItem:FC<ISlideItem> = ({slide, buttonTitle='Watch'}) => {

  const navigate = useNavigate()



  return (
    <div className={styles.slide}>
      {slide.bigPoster && 
      <img
        className={styles.image}
        src={slide.bigPoster}
        alt={slide.title}
        draggable={false}
      />}

      <div className={styles.content}>
        <div className={styles.heading}>
          {slide.title}
        </div>
        <div className={styles.subHeading}>
          {slide.subTitle}
        </div>
        <button className={styles.button} onClick={() => navigate(slide.link)}>
          {buttonTitle}
        </button>
      </div>
    </div>
  )
}

export default SlideItem