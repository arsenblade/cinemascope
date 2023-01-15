import { axiosPrivate, axiosPublic } from "../api/interseptors"
import { getGenresUrl, getMoviesUrl } from "../constant/serverPath"
import { IGenre, IMovie } from "../types/movies/movie.types"
const uuid = require("uuid");


export const GenreService = {
  async getAll(searchItem?: string): Promise<IGenre[]> {
    const response = await axiosPublic.get<IGenre[]>(getGenresUrl(''), {
      params: {
        name_like: searchItem ? searchItem : ''
      }
    })

    return response.data
  },

  async delete(id: string) {
    const response = await axiosPrivate.delete(getGenresUrl(id))
    return response
  },

  async create() {
    const defaultGenre = {
      id: uuid.v4(),
      name: '',
      slug: "",
      description: "",
      icon: "MdHiking",
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    await axiosPrivate.post<IGenre>(getGenresUrl(''), defaultGenre)

    return defaultGenre.id
  },

  async getBySlug(slug: string) {
    const {data: dataGenre} = await axiosPublic.get<IGenre[]>(getGenresUrl(''), {
      params: {
        slug_like: slug ? slug : ''
      }
    })

    const {data: dataMovies} = await axiosPublic.get<IMovie[]>(getMoviesUrl(''), {
      params: {
        q: dataGenre[0].id ? dataGenre[0].id : ''
      }
    })

    return {
      dataGenre: dataGenre[0],
      dataMovies
    }
  },

  async getById(id: string) {
    return await axiosPrivate.get<IGenre>(getGenresUrl(id))
  },

  async update(id: string, data: IGenre) {
    return await axiosPrivate.put<IGenre>(getGenresUrl(id), data)
  }
}