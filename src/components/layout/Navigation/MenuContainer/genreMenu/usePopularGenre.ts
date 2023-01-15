import { useQuery } from "react-query";
import { getGenresUrl } from "../../../../../constant/serverPath";
import { GenreService } from "../../../../../service/genre.service";
import { IMenuItem } from "../Menu.interface";

export const usePopularGenre = () => {
  const queryData = useQuery('genre menu', () => GenreService.getAll(), {
    select: (data) => data
    .filter((genre) => genre.icon)
    .map(genre => ({
      icon: genre.icon,
      link: getGenresUrl(genre.slug),
      title: genre.name
    } as IMenuItem)).splice(0, 4) 
  })

  return queryData;
}