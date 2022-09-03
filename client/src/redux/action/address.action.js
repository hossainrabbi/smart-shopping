import axios from 'axios';
import { addressAction } from '../store/address-slice';

export const getDivision = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      'http://bdapis.herokuapp.com/api/v1.1/divisions'
    );

    dispatch(
      addressAction.getDivision({
        divisions: data.data ?? [],
      })
    );
  } catch (err) {
    dispatch(
      addressAction.getDivision({
        divisionsError: err.message,
      })
    );
  }
};

export const getCity = (division) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://bdapis.herokuapp.com/api/v1.1/division/${division}`
    );

    dispatch(
      addressAction.getCity({
        city: data.data,
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(
      addressAction.getCity({
        cityError: err.message,
      })
    );
  }
};
