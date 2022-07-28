import axios from 'axios';
import { authAction } from '../store/auth-slice';

export const registerUser = (registerData) => async (dispatch) => {
  try {
    dispatch(
      authAction.registerUser({
        loading: true,
      })
    );

    const { data } = await axios.post('/api/v1/auth/register', registerData);

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
        error: err.response.data.message,
      })
    );
  }
};
