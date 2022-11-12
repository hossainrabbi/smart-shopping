import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/action/product-action';

const useFilter = (search, category, priceValue) => {
  const { products } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let allProducts = products?.products;

  allProducts = allProducts?.filter(
    (product) =>
      product?.productName?.toLowerCase()?.includes(search) ||
      product?.category?.toLowerCase()?.includes(search)
  );

  allProducts =
    category === 'all'
      ? allProducts
      : allProducts?.filter((product) => product.category === category);

  allProducts = allProducts?.filter((product) => product?.price >= priceValue);

  return allProducts;
};

export default useFilter;
