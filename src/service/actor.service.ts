import { axiosPrivate, axiosPublic } from "../api/interseptors"
import { getActorsUrl, getMoviesUrl } from "../constant/serverPath"
import { IActor, IMovie } from "../types/movies/movie.types"
import { formatUrlUploads } from "../utils/formatUrlUploads";
const uuid = require("uuid");


export const ActorService = {
  async getAll(searchItem?: string): Promise<IActor[]> {
    const response = await axiosPublic.get<IActor[]>(getActorsUrl(''), {
      params: {
        name_like: searchItem ? searchItem : ''
      }
    })
    return response.data
  },

  async delete(id: string) {
    const response = await axiosPrivate.delete(getActorsUrl(id))
    return response
  },

  async create() {
    const defaultActor = {
      id: uuid.v4(),
      name: "",
      photo: "",
      slug: "",
      countMovies: 0,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    await axiosPrivate.post<IActor>(getActorsUrl(''), defaultActor)

    return defaultActor.id
  },

  async getBySlug(slug: string) {
    const {data: dataActor} = await axiosPublic.get<IActor[]>(getActorsUrl(''), {
      params: {
        slug_like: slug ? slug : ''
      }
    })

    const {data: dataMovies} = await axiosPublic.get<IMovie[]>(getMoviesUrl(''), {
      params: {
        q: dataActor[0].id ? dataActor[0].id : ''
      }
    })

    return {
      dataActor: dataActor[0],
      dataMovies
    }
  },

  async getById(id: string) {
    const response = await axiosPrivate.get<IActor>(getActorsUrl(id))

    response.data.photo = formatUrlUploads(response.data.photo)

    return response
  },

  async update(id: string, data: IActor) {
    data.photo = data && '/uploads/actors/' + data.photo + '.jpg'
    return await axiosPrivate.put<IActor>(getActorsUrl(id), data)
  }
}