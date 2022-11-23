import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    createLoading: false,
    getLoading: false,
    removeLoading: false,
    updateLoading: false,
    singleProductLoading: false,
    isCreate: false,
    isRemove: false,
    isUpdate: false,
    createError: '',
    getError: '',
    removeError: '',
    updateError: '',
    singleProductError: '',
    products: [],
    singleProduct: null,
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

      state.createError = '';
      state.removeError = '';
      state.updateError = '';
      state.isCreate = false;
      state.isRemove = false;
      state.isUpdate = false;
    },
    getSingleProduct(state, action) {
      state.singleProductLoading = action.payload.loading;
      state.singleProductError = action.payload.error;
      state.singleProduct = action.payload.product;
    },
    updateProduct(state, action) {
      state.updateLoading = action.payload.loading;
      state.isUpdate = action.payload.isUpdate;
      state.updateError = action.payload.error;
      if (action.payload.product) {
        const findIndex = state.products.findIndex(
          (item) => item._id === action.payload.product._id
        );
        state.products[findIndex] = action.payload.product;
      }
    },
    removeProduct(state, action) {
      state.removeLoading = action.payload.loading;
      state.isRemove = action.payload.isRemove;
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
