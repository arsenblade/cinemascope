import { axiosPublic } from "../../api/interseptors"
import { getAuthLogin, getAuthUrl } from "../../constant/serverPath"
import { IUser } from "../../types/user.types";
import { removeTokenStorage, saveTokenStorage } from "./auth.helper"

const uuid = require("uuid");


export const AuthService = {
  async register(email: string, password: string) {
    const {data} = await axiosPublic.get<IUser[]>(getAuthUrl('users'), {
      params: {
        email_like: email
      }
    })

    if(data.length > 0) {
      throw new Error('There is already a user registered');
    }
 
    const defaultUSer = {
      id: uuid.v4(),
      email: email,
      password: password,
      isAdmin: false,
      favorites: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }

    const response = await axiosPublic.post<IUser>(getAuthUrl('users'), defaultUSer)

    if(response.data) saveTokenStorage(uuid.v4(), response.data)

    return response
  },

  async login(email: string, password: string) {
    const response = await axiosPublic.post<IUser>(getAuthLogin('login'), {email, password})
    if(response.data) saveTokenStorage(uuid.v4(), response.data)

    return response
  },

  logout() {
    removeTokenStorage()
    localStorage.removeItem('user')
  }
}