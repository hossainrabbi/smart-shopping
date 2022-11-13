import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/action/product-action';
import discountPrice from '../utils/discount';
import sortProductFilter from '../utils/sortProduct';

const useFilter = (search, category, priceValue, rattingValue, sortBy) => {
  const { products } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  let allProducts = products?.products || [];

  // filter by search input
  allProducts = allProducts?.filter(
    (product) =>
      product?.productName?.toLowerCase()?.includes(search) ||
      product?.category?.toLowerCase()?.includes(search)
  );

  // filter by categories
  allProducts =
    category === 'all'
      ? allProducts
      : allProducts?.filter((product) => product.category === category);

  // filter by ratting
  allProducts = allProducts?.filter(
    (product) => product.ratting >= rattingValue
  );

  // filter by product price range
  allProducts = allProducts?.filter(
    (product) => discountPrice(product?.price, product?.discount) >= priceValue
  );

  // store filtered product in another variable for sorting
  let searchFilter = allProducts;

  // sorting implement
  if (sortBy === 'aToZ') {
    allProducts = sortProductFilter(searchFilter);
  } else if (sortBy === 'zToA') {
    allProducts = sortProductFilter(searchFilter).reverse();
  } else if (sortBy === 'lowToHeigh') {
    allProducts = sortProductFilter(searchFilter, true);
  } else if (sortBy === 'heighToLow') {
    allProducts = sortProductFilter(searchFilter, true).reverse();
  } else {
    allProducts = searchFilter;
  }

  return allProducts;
};

export default useFilter;
