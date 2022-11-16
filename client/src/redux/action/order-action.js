import axios from 'axios';
import { orderAction } from '../store/order-slice';

export const createOrder = (submitInfo) => async (dispatch) => {
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
      orderAction.createOrder({
        loading: true,
      })
    );

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/order`,
      submitInfo,
      config
    );

    dispatch(
      orderAction.createOrder({
        loading: false,
        isOrder: true,
        orderData: data,
      })
    );
  } catch (err) {
    dispatch(
      orderAction.createOrder({
        loading: false,
        error: err.response.data.message || err.message,
        isOrder: false,
      })
    );
  }
};

export const getOrder = () => async (dispatch) => {
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
      orderAction.getOrder({
        loading: true,
      })
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/order`,
      config
    );

    dispatch(
      orderAction.getOrder({
        loading: false,
        error: '',
        orders: data,
      })
    );
  } catch (err) {
    dispatch(
      orderAction.getOrder({
        loading: false,
        error: err.response.data.message || err.message,
      })
    );
  }
};

export const clearOrder = () => (dispatch) => {
  dispatch(orderAction.clearOrder());
};
