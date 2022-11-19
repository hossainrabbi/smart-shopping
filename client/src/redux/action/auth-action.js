import axios from 'axios';
import { authAction } from '../store/auth-slice';

export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch(
      authAction.registerUser({
        loading: true,
      })
    );

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
      registerData
    );

    dispatch(
      authAction.registerUser({
        loading: false,
        error: '',
        isLogged: true,
        user: data,
      })
    );
  } catch (err) {
    dispatch(
      authAction.registerUser({
        loading: false,
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch(
      authAction.loginUser({
        loading: true,
      })
    );

    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
      loginData
    );

    dispatch(
      authAction.loginUser({
        loading: false,
        error: '',
        isLogged: true,
        user: data,
      })
    );
  } catch (err) {
    dispatch(
      authAction.loginUser({
        loading: false,
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};
