import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/action/product-action';

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
  allProducts = allProducts?.filter((product) => product?.price >= priceValue);

  // store filtered product in another variable for sorting
  let searchFilter = allProducts;

  // sorting implement
  if (sortBy === 'aToZ') {
    allProducts = searchFilter?.sort((a, b) =>
      a.productName > b.productName ? 1 : b.productName > a.productName ? -1 : 0
    );
  } else if (sortBy === 'zToA') {
    allProducts = searchFilter
      ?.sort((a, b) =>
        a.productName > b.productName
          ? 1
          : b.productName > a.productName
          ? -1
          : 0
      )
      .reverse();
  } else if (sortBy === 'lowToHeigh') {
    allProducts = searchFilter?.sort((a, b) =>
      a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
  } else if (sortBy === 'heighToLow') {
    allProducts = searchFilter
      ?.sort((a, b) => (a.price > b.price ? 1 : b.price > a.price ? -1 : 0))
      .reverse();
  } else {
    allProducts = searchFilter;
  }

  return allProducts;
};

export default useFilter;
