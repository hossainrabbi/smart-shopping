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
      `${process.env.REACT_APP_API_URL}/api/v1/products/categories`,
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
        error: err.response.data.message || err.message,
      })
    );
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    dispatch(
      categoriesAction.getCategories({
        loading: true,
      })
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/products/categories`
    );

    if (data) {
      dispatch(
        categoriesAction.getCategories({
          error: '',
          loading: false,
          categories: data,
        })
      );
    }
  } catch (err) {
    dispatch(
      categoriesAction.getCategories({
        loading: false,
        error: err.response.data.message || err.message,
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
    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/products/categories/${id}`,
      config
    );

    dispatch(
      categoriesAction.removeCategory({
        id,
      })
    );
  } catch (err) {
    dispatch(
      categoriesAction.removeCategory({
        error: err.response.data.message || err.message,
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
      `${process.env.REACT_APP_API_URL}/api/v1/products/categories/${id}`,
      updatedValue,
      config
    );

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
    dispatch(
      categoriesAction.updateCategory({
        error: err.response.data.message || err.message,
        isUpdate: false,
        loading: false,
      })
    );
  }
};
