import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '../../../redux/action/product-action';
import './Banner.scss';

const Banner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return <section className="banner__area position-relative" />;
};

export default Banner;
