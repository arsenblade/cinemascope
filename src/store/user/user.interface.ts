import { IUser } from "../../types/user.types"

export interface IUserState {
  email: string,
  isAdmin: boolean,
  id: string
}

export interface IToken {
  accessToken:string,
}

export interface IInitialState {
  user: IUserState | null,
  isLoading: boolean,
  error: string | null
}

export interface IEmailPassword {
  email: string,
  password: string
}