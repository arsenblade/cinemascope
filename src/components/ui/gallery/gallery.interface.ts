export interface IGalleryItem {
  posterPath: string,
  name: string,
  link: string,
  countOpened?: number,
  countMovies?: number,
  content?: {
    title: string,
    subTitle?: string
  }
}

export interface IGalleryItemProps {
  item: IGalleryItem,
  width?: number,
  height?: number,
  variant: 'vertical' | 'horizontal'
}