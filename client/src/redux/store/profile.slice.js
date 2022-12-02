import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    getLoading: false,
    updateLoading: false,
    getError: '',
    updateError: '',
    isUpdateProfile: false,
    profile: {},
  },
  reducers: {
    getProfile(state, action) {
      state.getLoading = action.payload.loading;
      state.getError = action.payload.error;
      state.profile = action.payload.profile;
      state.isUpdateProfile = false;
    },
    updateProfile(state, action) {
      state.updateLoading = action.payload.loading;
      state.updateError = action.payload.error;
      state.profile = action.payload.profile;
      state.isUpdateProfile = action.payload.isUpdateProfile;
    },
  },
});

export const profileAction = profileSlice.actions;
export default profileSlice;
