import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    getLoading: false,
    getError: 'false',
    profile: {},
  },
  reducers: {
    getProfile(state, action) {
      state.getLoading = action.payload.loading;
      state.getError = action.payload.error;
      state.profile = action.payload.profile;
    },
  },
});

export const profileAction = profileSlice.actions;
export default profileSlice;
