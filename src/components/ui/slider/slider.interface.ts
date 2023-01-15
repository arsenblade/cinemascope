import { IMovie } from "../../../types/movies/movie.types"

export interface ISlide extends Pick<IMovie, 'id' | 'bigPoster' | 'title'> {
  subTitle?: string,
  link: string
}

export interface ISlideItem {
  slide: ISlide,
  buttonTitle?: string
}

export interface ISlider {
  slides: ISlide[],
  buttonTitle?: string
}