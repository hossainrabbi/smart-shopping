import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    createLoading: false,
    createError: '',
    getError: '',
    removeError: '',
    isCreate: false,
    isRemove: false,
    categories: [],
  },
  reducers: {
    createCategories(state, action) {
      state.createLoading = action.payload.loading;
      state.createError = action.payload.error;
      state.isCreate = action.payload.isCreate;
      if (action.payload.category) {
        state.categories = [...state.categories, action.payload.category];
      }
    },
    getCategories(state, action) {
      state.getError = action.payload.error;
      state.categories = action.payload.categories;

      state.createError = '';
      state.removeError = '';
      state.isCreate = false;
      state.isRemove = false;
    },
    removeCategory(state, action) {
      state.isRemove = action.payload.isRemove;
      state.removeError = action.payload.error;
      if (action.payload.isRemove && action.payload.id) {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.id
        );
      }
    },
  },
});

export const categoriesAction = categoriesSlice.actions;
export default categoriesSlice;
