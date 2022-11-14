import axios from 'axios';
import { usersAction } from '../store/users-slice';

export const getUsers = () => async (dispatch) => {
  try {
    dispatch(
      usersAction.getUsers({
        loading: true,
      })
    );

    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/users`
    );
  } catch (err) {}
};
