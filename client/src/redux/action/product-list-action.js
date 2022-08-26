import { productListAction } from '../store/product-list-slice';

export const addProductWishList = (productId, products) => (dispatch) => {
  dispatch(
    productListAction.addWishList({
      productId,
      products,
    })
  );
};
