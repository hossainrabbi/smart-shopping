import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    divisions: [],
    divisionsError: '',
    city: [],
    cityError: '',
  },
  reducers: {
    getDivision(state, action) {
      state.divisions = action.payload.divisions;
      state.divisionsError = action.payload.divisionsError;
    },
    getCity(state, action) {
      state.city = action.payload.city;
      state.cityError = action.payload.cityError;
    },
  },
});

export const addressAction = addressSlice.actions;
export default addressSlice;
