import axios from 'axios';
import { addressAction } from '../store/address-slice';

export const getDivision = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BD_API_URL}/divisions`
    );

    console.log('d', data?.data);

    dispatch(
      addressAction.getDivision({
        divisions: data.data || [],
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(
      addressAction.getDivision({
        divisionsError: err.response.data.message || err.message,
      })
    );
  }
};

export const getCity = (division) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BD_API_URL}/division/${division}`
    );

    console.log('cc', data?.data);

    dispatch(
      addressAction.getCity({
        city: data.data || [],
      })
    );
  } catch (err) {
    console.log(err);
    dispatch(
      addressAction.getCity({
        cityError: err.response.data.message || err.message,
      })
    );
  }
};
