import { FC } from 'react'
import { ISlider } from './slider.interface'
import { useSlider } from './useSlider'
import styles from './Slider.module.scss'
import { CSSTransition } from 'react-transition-group'
import SlideItem from './SliderItem'
import SlideArrow from './SliderArrow/SliderArrow'

const Slider:FC<ISlider> = ({slides, buttonTitle}) => {
  const {currentIdx, handleArrowClick, isExistsNext, isExistsPrev, slideIn} = useSlider(slides.length)

  return (
    <div className={styles.slider}>
    <CSSTransition
      in={slideIn}
      classNames='slide-animation'
      timeout={300}
      unmountOnExit
    >
      <SlideItem
        slide={slides[currentIdx]}
        buttonTitle={buttonTitle}
      />
    </CSSTransition>

    {isExistsPrev && <SlideArrow variant='left' clickHandler={() => handleArrowClick('prev')} />}
    {isExistsNext && <SlideArrow variant='right' clickHandler={() => handleArrowClick('next')} />}
  </div>
  )
}

export default Slider