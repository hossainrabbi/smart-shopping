import { createSlice } from '@reduxjs/toolkit';

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    createError: '',
    getError: '',
    removeError: '',
    updateError: '',
    isCreate: false,
    isUpdate: false,
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
      state.getLoading = action.payload.loading;
      state.getError = action.payload.error;
      state.categories = action.payload.categories;

      state.createError = '';
      state.removeError = '';
      state.updateError = '';
      state.isCreate = false;
      state.isUpdate = false;
    },
    removeCategory(state, action) {
      state.removeError = action.payload.error;
      if (action.payload.id) {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.id
        );
      }
    },
    updateCategory(state, action) {
      state.updateError = action.payload.error;
      state.isUpdate = action.payload.isUpdate;
      state.updateLoading = action.payload.loading;
      if (action.payload.id) {
        state.categories = state.categories.map((category) =>
          category._id === action.payload.id
            ? action.payload.category
            : category
        );
      }
    },
  },
});

export const categoriesAction = categoriesSlice.actions;
export default categoriesSlice;
