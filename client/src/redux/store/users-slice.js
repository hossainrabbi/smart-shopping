import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    getLoading: false,
    getError: '',
    users: [],
  },
  reducers: {
    getUsers(state, action) {
      state.getUsersLoading = action.payload.loading;
      state.getUsersError = action.payload.error;
      state.users = action.payload.users;
    },
  },
});

export const usersAction = usersSlice.actions;
export default usersSlice;