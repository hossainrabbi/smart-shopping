import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    createLoading: false,
    isCreate: false,
    createError: '',
    products: [],
  },
  reducers: {
    createProduct(state, action) {
      state.createLoading = action.payload.loading;
      state.isCreate = action.payload.isCreate;
      state.createError = action.payload.error;
      if (action.payload.product) {
        state.products = [...state.products, action.payload.product];
      }
    },
  },
});

export const productAction = productSlice.actions;
export default productSlice;
