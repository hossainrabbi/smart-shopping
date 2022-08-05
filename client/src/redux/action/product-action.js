import axios from 'axios';
import { productAction } from '../store/product-slice';

export const createProduct = (productData) => async (dispatch) => {
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
      productAction.createProduct({
        loading: true,
      })
    );

    const { data } = await axios.post('/api/v1/products', productData, config);

    dispatch(
      productAction.createProduct({
        loading: false,
        error: '',
        product: data,
        isCreate: true,
      })
    );
  } catch (err) {
    dispatch(
      productAction.createProduct({
        loading: false,
        error: err.response.data.message,
      })
    );
  }
};

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(
      productAction.getProducts({
        loading: true,
      })
    );

    const { data } = await axios.get('/api/v1/products');

    dispatch(
      productAction.getProducts({
        loading: false,
        error: '',
        products: data,
      })
    );
  } catch (err) {
    dispatch(
      productAction.getProducts({
        loading: false,
        error: err.response.data.message,
      })
    );
  }
};

export const removeProduct = (productId) => async (dispatch) => {
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
      productAction.removeProduct({
        loading: true,
      })
    );

    await axios.delete(`/api/v1/products/${productId}`, config);

    dispatch(
      productAction.removeProduct({
        loading: false,
        isRemove: true,
        error: '',
        productId,
      })
    );
  } catch (err) {
    dispatch(
      productAction.removeProduct({
        loading: false,
        error: err.response.data.message,
      })
    );
  }
};
