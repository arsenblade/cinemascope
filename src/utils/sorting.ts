import { IMovie } from "../types/movies/movie.types";

interface ISimilarityRating {
  idMovie: string;
  rating: number
}

export const sortSimilarMovies = (movies: IMovie[], currentMovie: IMovie) => {
  let similarityRating: ISimilarityRating [] = []
  movies.forEach((movie) => similarityRating.push({
    idMovie: movie.id,
    rating: 0
  }))

  movies.forEach((movie, idx) => {
    movie.genres.forEach((genre) => {
      currentMovie.genres.forEach((g) => {
        if(g.id === genre.id) {
          similarityRating[idx].rating++ 
        }
      })
    })
  })


  similarityRating = similarityRating.sort((a, b) => b.rating - a.rating)

  const resultMovies: IMovie[] = similarityRating.map((item) => {
    const movie = movies.filter(m => m.id === item.idMovie)

    return movie[0]
  })

  return resultMovies
}