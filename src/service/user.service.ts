import { axiosPrivate, axiosPublic } from "../api/interseptors"
import { getUsersUrl } from "../constant/serverPath"
import { IUser } from "../types/user.types"
const uuid = require("uuid");

export const UserService = {
  async getAll(searchItem?: string): Promise<IUser[]> {
    const response = await axiosPublic.get<IUser[]>(getUsersUrl(''), {
      params: {
        email_like: searchItem ? searchItem : ''
      }
    })

    return response.data
  },

  async delete(id: string) {
    const response = await axiosPrivate.delete(getUsersUrl(id))
    return response
  },

  async toggleFavorite(movieId: string, dataUser: IUser | undefined) {
    if(dataUser) {
      const isFavorite = dataUser.favorites.find(fMovie => fMovie === movieId)
      if(!isFavorite) {
        dataUser.favorites.push(movieId)
        return await axiosPublic.put(getUsersUrl(dataUser.id), dataUser)
      }
      else {
        dataUser.favorites = dataUser.favorites.filter(fMovie => fMovie !== movieId)
        return await axiosPublic.put(getUsersUrl(dataUser.id), dataUser)
      }
    }
  },

  async getProfile(email: string) {
    const response = await axiosPrivate.get<IUser[]>(getUsersUrl(''))
    const user = response.data.find(currentUser => currentUser.email === email)
    return user
  },

  async getById(id: string) {
    return await axiosPrivate.get<IUser>(getUsersUrl(id))
  },

  async update(id: string, dataField: IUser, data: IUser | null ) {
    if(data) {
      data.updatedAt = String(Date.now())
      data.email = dataField.email
      data.password = dataField.password
      data.isAdmin = dataField.isAdmin
    }

    return await axiosPrivate.put<IUser>(getUsersUrl(id), data)
  }
}