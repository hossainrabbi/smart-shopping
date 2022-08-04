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
