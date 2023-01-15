import { IRating } from "../types/movies/movie.types";

export const ratingCalculation = (rating: IRating[]) => {
  if(rating.length > 0) {
    let sumRating = 0;
    rating.forEach(item => sumRating += item.value)
    return (sumRating / rating.length)
  }
  else {
    return 0
  }
}