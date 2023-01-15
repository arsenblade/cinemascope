import Cookies from "js-cookie"
import { IUser } from "../../types/user.types"

export const saveTokenStorage = (token: string, user: IUser) => {
  Cookies.set('accessToken', token)
  localStorage.setItem('user', JSON.stringify({
    email: user.email,
    isAdmin: user.isAdmin,
    id: user.id
  }))
}

export const removeTokenStorage = () => {
  Cookies.remove('accessToken')
}