import axios from 'axios';
import { profileAction } from '../store/profile.slice';

// get profile
export const getProfile = () => async (dispatch) => {
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
      profileAction.getProfile({
        loading: true,
      })
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/profile`,
      config
    );

    console.log(data);

    dispatch(
      profileAction.getProfile({
        loading: false,
        error: '',
        profile: data,
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(
      profileAction.getProfile({
        loading: false,
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};

// update profile
export const updateProfile = (profileData) => async (dispatch) => {
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
      profileAction.updateProfile({
        loading: true,
      })
    );

    const { data } = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/user/profile`,
      profileData,
      config
    );

    dispatch(
      profileAction.updateProfile({
        loading: false,
        error: '',
        isUpdateProfile: true,
        profile: data,
      })
    );
  } catch (err) {
    dispatch(
      profileAction.updateProfile({
        loading: false,
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};
