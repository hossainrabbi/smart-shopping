import { createSlice } from '@reduxjs/toolkit';

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    wishList: [],
  },
  reducers: {
    addWishList(state, action) {
      const findProduct = action.payload.products?.find(
        (product) => product._id === action.payload?.productId
      );

      if (
        state.wishList.findIndex(
          (product) => product._id === findProduct._id
        ) === -1
      ) {
        state.wishList = [...state.wishList, findProduct];
      } else {
        state.wishList = state.wishList.filter(
          (product) => product._id !== action.payload?.productId
        );
      }
    },
  },
});

export const productListAction = productListSlice.actions;
export default productListSlice;
