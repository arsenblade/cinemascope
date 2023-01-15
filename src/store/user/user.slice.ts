import { IInitialState } from "./user.interface";
import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./user.actions";
import { getStoreLocal } from "../../utils/localStorage";

const initialState: IInitialState = {
  isLoading: false,
  user: getStoreLocal('user'),
  error: null
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.pending, state => {
      state.isLoading = true
    }).addCase(register.fulfilled, (state, {payload} ) => {
      state.isLoading = false
      state.user = {
        email: payload.email,
        isAdmin: payload.isAdmin,
        id: payload.id
      }
    }).addCase(register.rejected, state => {
      state.isLoading = false
      state.user = null
    }).addCase(login.pending, state => {
      state.isLoading = true
    }).addCase(login.fulfilled, (state, {payload} ) => {
      state.isLoading = false
      state.user = {
        email: payload.email,
        isAdmin: payload.isAdmin,
        id: payload.id
      }
    }).addCase(login.rejected, state => {
      state.isLoading = false
      state.user = null
    }).addCase(logout.fulfilled, state => {
      state.isLoading = false
      state.user = null
    })
  }
})

export const {reducer} = userSlice;