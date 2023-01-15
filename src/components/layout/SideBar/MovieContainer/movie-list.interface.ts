import { IMovie } from "../../../../types/movies/movie.types";

export interface IMovieList {
  title: string;
  link: string;
  movies: IMovie[]
}