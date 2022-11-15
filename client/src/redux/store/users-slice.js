import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    getLoading: false,
    removeLoading: false,
    updateLoading: false,
    getError: '',
    removeError: '',
    updateError: '',
    isRemove: false,
  },
  reducers: {
    getUsers(state, action) {
      state.getLoading = action.payload.loading;
      state.getError = action.payload.error;
      state.users = action.payload.users;

      state.createError = '';
      state.removeError = '';
      state.updateError = '';
      state.isRemove = false;
      state.removeLoading = false;
      state.updateLoading = false;
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
    makeAdmin(state, action) {
      state.updateLoading = action.payload.loading;
      state.updateError = action.payload.error;
      if (action.payload.user) {
        const findIndex = state.users.findIndex(
          (user) => user._id === action.payload.user._id
        );

        if (findIndex >= 0) {
          state.users[findIndex] = action.payload.user;
        }
      }
    },
  },
});

export const usersAction = usersSlice.actions;
export default usersSlice;
