import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    getLoading: false,
    createLoading: false,
    isOrder: false,
    getError: '',
    createError: '',
    orders: [],
  },
  reducers: {
    createOrder(state, action) {
      state.createLoading = action.payload.loading;
      state.isOrder = action.payload.isOrder;
      state.createError = action.payload.error;
    },
    getOrder(state, action) {
      state.getLoading = action.payload.loading;
      state.getError = action.payload.error;
      state.orders = action.payload.orders;
    },
    clearOrder(state) {
      state.isOrder = false;
      state.createError = '';
    },
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice;
