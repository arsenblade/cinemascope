import { axiosPrivate, axiosPublic } from "../api/interseptors"
import { IMovieEditInput } from "../components/screens/admin/movies/movie/movie-edit.interface";
import { getMoviesUrl } from "../constant/serverPath"
import { IActor, IGenre, IMovie } from "../types/movies/movie.types"
import { formatUrlUploads } from "../utils/formatUrlUploads";
const uuid = require("uuid");

export const MovieService = {
  async getAll(searchItem?: string) {
    const response = await axiosPublic.get<IMovie[]>(getMoviesUrl(''), {
      params: {
        title_like: searchItem ? searchItem : ''
      }
    })
    return response.data
  },

  async delete(id: string) {
    const response = await axiosPrivate.delete(getMoviesUrl(id))
    return response
  },

  async create() {
    const defaultMovies = {
      id: uuid.v4(),
      poster: "",
      bigPoster: "",
      title: "",
      rating: [],
      genres: [],
      countOpened: 0,
      videoUrl: "",
      actors: [],
      slug: "",
      isSendTelegram: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      parameters: {
        year: null,
        duration: null,
        country: ""
      }
    }

    await axiosPrivate.post<IMovie>(getMoviesUrl(''), defaultMovies)

    return defaultMovies.id
  },

  async updateRate(data: IMovie) {
    return await axiosPrivate.put<IMovie>(getMoviesUrl(data.id), data)
  },

  
  async update(id: string, dataField: IMovieEditInput, dataMovie: IMovie | null, dataGenres?: IGenre[] | null, dataActors?: IActor[] | null) {
    if(dataMovie) {
      dataMovie.genres = dataGenres ? dataGenres?.filter(genre => dataField.genres.some(g => g === genre.id)) : []
      dataMovie.actors = dataActors ? dataActors?.filter(actor => dataField.actors.some(a => a === actor.id)) : []
      dataMovie.title = dataField && dataField.title;
      dataMovie.parameters = dataField && dataField.parameters
      dataMovie.slug = dataField && dataField.slug
      dataMovie.poster = dataField && '/uploads/cinema/' + dataField.poster + '.jpg'
      dataMovie.bigPoster = dataField && '/uploads/cinema/' + dataField.bigPoster + '.jpg'
      dataMovie.videoUrl = dataField && '/uploads/cinema/' + dataField.videoUrl + '.mp4'
    }

    return await axiosPrivate.put<IMovie>(getMoviesUrl(id), dataMovie)
  },

  async getByIdClassic(id: string) {
    return await axiosPrivate.get<IMovie>(getMoviesUrl(id))
  },

  async getBySlug(slug: string) {
    const {data} = await axiosPublic.get<IMovie[]>(getMoviesUrl(''), {
      params: {
        slug_like: slug ? slug : ''
      }
    })
    return data[0]
  },

  async updateCountOpened(slug: string| null) {
    const {data} = await axiosPublic.get<IMovie[]>(getMoviesUrl(''), {
      params: {
        slug_like: slug ? slug : ''
      }
    })
    console.log(data[0].countOpened)
    if(data.length === 1) {
      data[0].countOpened = data[0].countOpened + 1
      console.log(data[0].countOpened)
      return await axiosPublic.put<IMovie>(getMoviesUrl(data[0].id), data[0])
    }
  },


  async getByIdMovieEditInput(id: string) {
    const {data} = await axiosPrivate.get<IMovie>(getMoviesUrl(id))
    const poster = formatUrlUploads(data.poster)
    const bigPoster = formatUrlUploads(data.bigPoster)
    const videoUrl = formatUrlUploads(data.videoUrl)
    const defaultMovies: IMovieEditInput = {
      poster,
      bigPoster,
      title: data.title,
      genres: data.genres.map(genre => genre.id),
      videoUrl,
      createdAt: data.createdAt,
      actors: data.actors.map(actor => actor.id),
      slug: data.slug,
      parameters: {
        year: data.parameters.year,
        duration: data.parameters.duration,
        country: data.parameters.country
      },
      id: data.id
    }
    return defaultMovies
  },
}