import { IMovie } from "../../../../../types/movies/movie.types"


export interface IMovieEditInput
	extends Omit<IMovie, 'rating' | 'countOpened' | 'genres' | 'actors'> {
	genres: string[]
	actors: string[]
}