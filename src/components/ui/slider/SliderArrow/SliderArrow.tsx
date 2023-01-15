import { FC, useState } from 'react'
import styles from './SliderArrow.module.scss'
import cn from 'classnames'
import MaterialIcon from '../../MaterialIcon'
import { CSSTransition } from 'react-transition-group'

interface ISlideArrow {
  variant: 'left' | 'right',
  clickHandler: () => void  
}

const SlideArrow:FC<ISlideArrow> = ({clickHandler, variant}) => {
  const isLeft = variant === 'left'
  const isRight = variant === 'right'
  const [slideIn, setSlideIn] = useState(true)

  const handleClick = () => {
    setSlideIn(false)
    clickHandler()

    setTimeout(() => {
      setSlideIn(true)
    }, 400)
  }

  return (
      <CSSTransition
      in={slideIn}
      classNames='arrow-animation'
      timeout={200}
      unmountOnExit
    >
    <button onClick={handleClick} className={cn(styles.arrow, {
      [styles.left]: isLeft,
      [styles.right]: isRight
    })}
      aria-label={isLeft ? 'previous slide' : 'next slide'}
    >
      <MaterialIcon name={isLeft ? 'MdChevronLeft' : 'MdChevronRight'} />
    </button>
  </CSSTransition>
  )
}

export default SlideArrow