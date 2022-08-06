import axios from 'axios';
import { categoriesAction } from '../store/categories-slice';

export const createCategories = (category) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem('smart-shopping-login')).user
        ).token
      }`,
    },
  };

  try {
    dispatch(
      categoriesAction.createCategories({
        loading: true,
      })
    );

    const { data } = await axios.post(
      '/api/v1/products/categories',
      category,
      config
    );

    if (data) {
      dispatch(
        categoriesAction.createCategories({
          loading: false,
          error: '',
          category: data,
          isCreate: true,
        })
      );
    }
  } catch (err) {
    dispatch(
      categoriesAction.createCategories({
        loading: false,
        isCreate: false,
        error: err.response.data.message,
      })
    );
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(
      categoriesAction.getCategories({
        error: '',
      })
    );

    const { data } = await axios.get('/api/v1/products/categories');

    if (data) {
      dispatch(
        categoriesAction.getCategories({
          error: '',
          categories: data,
        })
      );
    }
  } catch (err) {
    dispatch(
      categoriesAction.getCategories({
        error: err.response.data.message,
      })
    );
  }
};

export const removeCategory = (id) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem('smart-shopping-login')).user
        ).token
      }`,
    },
  };

  try {
    await axios.delete(`/api/v1/products/categories/${id}`, config);

    dispatch(
      categoriesAction.removeCategory({
        id,
      })
    );
  } catch (err) {
    dispatch(
      categoriesAction.removeCategory({
        error: err.response.data.message,
      })
    );
  }
};

export const updateCategory = (id, updatedValue) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(
          JSON.parse(localStorage.getItem('smart-shopping-login')).user
        ).token
      }`,
    },
  };

  try {
    dispatch(
      categoriesAction.updateCategory({
        loading: true,
      })
    );

    const { data } = await axios.put(
      `/api/v1/products/categories/${id}`,
      updatedValue,
      config
    );

    console.log(data);

    dispatch(
      categoriesAction.updateCategory({
        error: '',
        isUpdate: true,
        id,
        category: data,
        loading: false,
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(
      categoriesAction.updateCategory({
        error: err.response.data.message,
        isUpdate: false,
        loading: false,
      })
    );
  }
};
