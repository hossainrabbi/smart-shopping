import axios from 'axios';
import { addressAction } from '../store/address-slice';

export const getDivision = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BD_API_URL}/divisions`
    );

    dispatch(
      addressAction.getDivision({
        divisions: data.data || [],
      })
    );
  } catch (err) {
    dispatch(
      addressAction.getDivision({
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};

export const getCity = (division) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BD_API_URL}/division/${division}`
    );

    dispatch(
      addressAction.getCity({
        city: data.data || [],
      })
    );
  } catch (err) {
    dispatch(
      addressAction.getCity({
        error: err?.response?.data?.message || err.message,
      })
    );
  }
};
