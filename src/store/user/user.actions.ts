import { createAsyncThunk } from "@reduxjs/toolkit";
import { MyToast } from "../../components/ui/toast/MyToast";
import { AuthService } from "../../service/auth/auth.service";
import { IUser } from "../../types/user.types";
import { IEmailPassword } from "./user.interface";

export const register = createAsyncThunk<IUser, IEmailPassword>('registration', async ({email, password}, thunkApi) => {
  try {
    const response = await AuthService.register(email, password);
    MyToast('Registration completed success', true)
    return response.data
  } catch (error) {
    MyToast('Registration error', false)
    return thunkApi.rejectWithValue(error)
  }
})

export const login = createAsyncThunk<IUser, IEmailPassword>('login', async ({email, password}, thunkApi) => {
  try {
    const response = await AuthService.login(email, password);
    MyToast('Login completed success', true)
    return response.data
  } catch (error) {
    MyToast('Login error', false)
    return thunkApi.rejectWithValue(error)
  }
})


export const logout = createAsyncThunk('logout', async (_, thunkApi) => {
  await AuthService.logout();
  MyToast('Logout completed success', true)
})




