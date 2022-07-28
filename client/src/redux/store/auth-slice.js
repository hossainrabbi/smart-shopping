import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { loading: false, error: '', isLogged: false, user: {} },
  reducers: {
    registerUser(state, action) {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
      state.isLogged = action.payload.isLogged;
      state.user = action.payload.user;
    },

    loginUser(state, action) {
      state.loading = action.payload.loading;
      state.error = action.payload.error;
      state.isLogged = action.payload.isLogged;
      state.user = action.payload.user;
    },

    logoutUser(state) {
      state.isLogged = false;
      state.user = {};
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice;
