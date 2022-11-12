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

  dispatch(
    orderAction.createOrder({
      createLoading: true,
    })
  );

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/order`,
      submitInfo,
      config
    );

    dispatch(
      orderAction.createOrder({
        createLoading: false,
        isOrder: true,
        orderData: data,
      })
    );
  } catch (err) {
    dispatch(
      orderAction.createOrder({
        createLoading: false,
        createError: err.response.data.message,
        isOrder: false,
      })
    );
  }
};

export const clearOrder = () => (dispatch) => {
  dispatch(orderAction.clearOrder());
};
