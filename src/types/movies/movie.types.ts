import { TypeMaterialIconName } from "../icon.types";

export interface IGenre {
  id: string,
  name: string,
  slug: string,
  description: string,
  icon: TypeMaterialIconName
} 

export interface IParameters {
  year: number,
  duration: number, 
  country: string
}

export interface IActor {
  id: string,
  photo: string,
  name: string,
  countMovies: number,
  slug: string
}

export interface IMovie {
  id: string,
  poster: string,
  bigPoster: string,
  title: string,
  parameters: IParameters,
  genres: IGenre[],
  actors: IActor[],
  countOpened: number,
  createdAt: number,
  videoUrl: string,
  rating: IRating[],
  slug: string
}

export interface IRating {
  idUser: string,
  value: number,
}