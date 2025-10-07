import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AuthData, UserState } from "@/types/AuthType";


const initialState: UserState = {
  user: null, 
  loading: false,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action: PayloadAction<AuthData>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, setAccessToken } = userSlice.actions;

export default userSlice.reducer;