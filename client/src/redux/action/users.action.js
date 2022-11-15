import axios from 'axios';
import { usersAction } from '../store/users-slice';

export const getUsers = () => async (dispatch) => {
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
      usersAction.getUsers({
        loading: true,
      })
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users`,
      config
    );

    dispatch(
      usersAction.getUsers({
        loading: false,
        error: '',
        users: data,
      })
    );
  } catch (err) {
    dispatch(
      usersAction.getUsers({
        loading: false,
        error: err.response.data.message || err.message,
      })
    );
  }
};

export const removeUser = (userId) => async (dispatch) => {
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
      usersAction.removeUser({
        loading: true,
      })
    );

    await axios.delete(
      `${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`,
      config
    );

    dispatch(
      usersAction.removeUser({
        loading: false,
        isRemove: true,
        error: '',
        userId,
      })
    );
  } catch (err) {
    dispatch(
      usersAction.removeUser({
        loading: false,
        isRemove: false,
        error: err.response.data.message || err.message,
      })
    );
  }
};
