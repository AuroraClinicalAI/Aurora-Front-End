import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { UserState } from "@/types/AuthType";

import type { User } from "@/types/ModelType";

const initialState: UserState = {
  user: null, 
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;