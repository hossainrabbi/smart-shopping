import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    createLoading: false,
    isOrder: false,
    createError: '',
  },
  reducers: {
    createOrder(state, action) {
      state.createLoading = action.payload.createLoading;
      state.isOrder = action.payload.isOrder;
      state.createError = action.payload.createError;
    },
    clearOrder(state) {
      state.isOrder = false;
      state.createError = '';
    },
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice;
