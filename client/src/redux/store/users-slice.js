import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    getLoading: false,
    removeLoading: false,
    getError: '',
    removeError: '',
    isRemove: false,
  },
  reducers: {
    getUsers(state, action) {
      state.getLoading = action.payload.loading;
      state.getError = action.payload.error;
      state.users = action.payload.users;
    },
    removeUser(state, action) {
      state.removeLoading = action.payload.loading;
      state.removeError = action.payload.error;
      state.isRemove = action.payload.isRemove;
      if (action.payload.userId) {
        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        );
      }
    },
  },
});

export const usersAction = usersSlice.actions;
export default usersSlice;
