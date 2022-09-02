import { productListAction } from '../store/product-list-slice';

export const addProductWishList = (productId, products) => (dispatch) => {
  dispatch(
    productListAction.addWishList({
      productId,
      products,
    })
  );
};

export const addProductCartList = (productId, products) => (dispatch) => {
  dispatch(
    productListAction.addCartList({
      productId,
      products,
    })
  );
};

export const removeFromCart = (productId) => (dispatch) => {
  dispatch(
    productListAction.removeFromCart({
      productId,
    })
  );
};

export const incrementCartProductQty = (productId) => (dispatch) => {
  dispatch(
    productListAction.incrementCartProductQty({
      productId,
    })
  );
};

export const decrementCartProductQty = (productId) => (dispatch) => {
  dispatch(
    productListAction.decrementCartProductQty({
      productId,
    })
  );
};

export const clearAllFromCart = () => (dispatch) => {
  dispatch(productListAction.clearAllFromCart());
};
