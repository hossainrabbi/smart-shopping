import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/action/product-action';
import './Banner.scss';

const Banner = () => {
  const { products } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="banner__area position-relative">
      {products?.products?.length > 6 && (
        <Button className="position-absolute">Shop Now</Button>
      )}
    </section>
  );
};

export default Banner;
