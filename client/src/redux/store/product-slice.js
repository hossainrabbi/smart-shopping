import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    createLoading: false,
    getLoading: false,
    isCreate: false,
    createError: '',
    getError: '',
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
    getProducts(state, action) {
      state.getLoading = action.loading;
      state.getError = action.error;
      state.products = action.products;
    },
  },
});

export const productAction = productSlice.actions;
export default productSlice;
