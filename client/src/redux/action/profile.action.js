import axios from 'axios';
import { profileAction } from '../store/profile.slice';

export const getProfile = () => async (dispatch) => {
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
      profileAction.getProfile({
        loading: true,
      })
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users/profile`,
      config
    );

    dispatch(
      profileAction.getProfile({
        loading: false,
        error: '',
        profile: data,
      })
    );
  } catch (err) {
    dispatch(
      profileAction.getProfile({
        loading: false,
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};
