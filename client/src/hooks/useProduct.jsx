import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProducts } from '../redux/action/product-action';
import {
  addProductCartList,
  addProductWishList,
} from '../redux/action/product-list-action';

const useProduct = (productQty = 0) => {
  const { products, productList } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const wishProductItem = (id) => {
    dispatch(addProductWishList(id, products?.products));
  };

  const cartProductItem = (id) => {
    dispatch(addProductCartList(id, products?.products, productQty));
    if (id) {
      toast(
        <Link to="/cart" className="text-decoration-none">
          <span className="text-muted">Product add to cart,</span>{' '}
          <span className="text-primary text-decoration-underline">
            Go To Cart
          </span>
        </Link>,
        {
          position: 'bottom-center',
          icon: '🛒',
          duration: 1000,
        }
      );
    }
  };

  return {
    products,
    productList,
    wishProductItem,
    cartProductItem,
  };
};

export default useProduct;
