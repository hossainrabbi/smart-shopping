import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/action/product-action';

const useFilter = (search, category, priceValue, rattingValue, sortBy) => {
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

  allProducts = allProducts?.filter(
    (product) => product.ratting >= rattingValue
  );

  allProducts = allProducts?.filter((product) => product?.price >= priceValue);

  let searchFilter = allProducts;

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
