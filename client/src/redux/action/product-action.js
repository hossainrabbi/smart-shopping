import axios from 'axios';
import { productAction } from '../store/product-slice';

export const createProduct = (productData) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(
          JSON.parse(
            localStorage.getItem(`${process.env.REACT_APP_SITE_NAME}-login`)
          ).user
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

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/products`,
      productData,
      config
    );

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
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(
          JSON.parse(
            localStorage.getItem(`${process.env.REACT_APP_SITE_NAME}-login`)
          ).user
        ).token
      }`,
    },
  };

  try {
    dispatch(
      productAction.updateProduct({
        loading: true,
      })
    );

    const { data } = await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}`,
      productData,
      config
    );

    dispatch(
      productAction.updateProduct({
        loading: false,
        error: '',
        product: data,
        isUpdate: true,
      })
    );
  } catch (err) {
    dispatch(
      productAction.updateProduct({
        loading: false,
        error: err?.response?.data?.message || err.message,
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

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/products`
    );

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
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};

export const getSingleProduct = (productId) => async (dispatch) => {
  try {
    dispatch(
      productAction.getSingleProduct({
        loading: true,
      })
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}`
    );

    dispatch(
      productAction.getSingleProduct({
        loading: false,
        error: '',
        product: data,
      })
    );
  } catch (err) {
    dispatch(
      productAction.getSingleProduct({
        loading: false,
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${
        JSON.parse(
          JSON.parse(
            localStorage.getItem(`${process.env.REACT_APP_SITE_NAME}-login`)
          ).user
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

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/products/${productId}`,
      config
    );

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
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};
