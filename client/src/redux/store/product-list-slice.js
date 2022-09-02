import { createSlice } from '@reduxjs/toolkit';

const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    cartList: [],
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

    addCartList(state, action) {
      const findProduct = action.payload.products.find(
        (product) => product._id === action.payload.productId
      );

      const findIndex = state.cartList.findIndex(
        (product) => product._id === findProduct._id
      );

      if (findIndex === -1 && findProduct.inStock >= 1) {
        state.cartList = [...state.cartList, { ...findProduct, qty: 1 }];
      } else if (
        findIndex !== -1 &&
        state.cartList[findIndex].inStock >= 1 &&
        state.cartList[findIndex].qty < state.cartList[findIndex].inStock
      ) {
        state.cartList[findIndex].qty = state.cartList[findIndex].qty + 1;
        state.cartList = [...state.cartList];
      }
    },

    removeFromCart(state, action) {
      state.cartList = [
        ...state.cartList.filter(
          (product) => product._id !== action.payload.productId
        ),
      ];
    },

    incrementCartProductQty(state, action) {
      const findIndex = state.cartList.findIndex(
        (product) => product._id === action.payload.productId
      );
      if (
        findIndex !== -1 &&
        state.cartList[findIndex].qty < state.cartList[findIndex].inStock
      ) {
        state.cartList[findIndex].qty++;
      }
    },

    decrementCartProductQty(state, action) {
      const findIndex = state.cartList.findIndex(
        (product) => product._id === action.payload.productId
      );
      if (findIndex !== -1 && state.cartList[findIndex].qty > 1) {
        state.cartList[findIndex].qty--;
      }
    },

    clearAllFromCart(state) {
      state.cartList = [];
    },
  },
});

export const productListAction = productListSlice.actions;
export default productListSlice;
