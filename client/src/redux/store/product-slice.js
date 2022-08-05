import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    createLoading: false,
    getLoading: false,
    removeLoading: false,
    isCreate: false,
    isRemove: false,
    createError: '',
    getError: '',
    removeError: '',
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
      state.getLoading = action.payload.loading;
      state.getError = action.payload.error;
      state.products = action.payload.products;
    },
    removeProduct(state, action) {
      state.isRemove = action.payload.isRemove;
      state.removeLoading = action.payload.loading;
      state.removeError = action.payload.error;
      if (action.payload.productId) {
        state.products = state.products.filter(
          (product) => product._id !== action.payload.productId
        );
      }
    },
  },
});

export const productAction = productSlice.actions;
export default productSlice;
