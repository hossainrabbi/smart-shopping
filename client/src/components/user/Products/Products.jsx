import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Products.scss';
import { getProducts } from '../../../redux/action/product-action';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import { useState } from 'react';

const Products = () => {
  const products = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const wishProductItem = (id) => {
    const findProduct = products?.products?.find(
      (product) => product._id === id
    );

    if (
      wishList.findIndex((product) => product._id === findProduct._id) === -1
    ) {
      setWishList([...wishList, findProduct]);
    } else {
      setWishList(wishList.filter((product) => product._id !== id));
    }
  };

  const cartProductItem = () => {
    console.log('Cart List Clicked');
  };

  return (
    <Container>
      <ContentTitle title="Our Products" />
      <Row>
        {products?.products?.map((product) => (
          <Col md={4} key={product._id} className="mb-4">
            <SingleProduct
              iconLeft={
                wishList.some((item) => item._id === product._id)
                  ? FaHeart
                  : FaRegHeart
              }
              iconRight={FaShoppingCart}
              leftIconClass={
                wishList.some((item) => item._id === product._id)
                  ? 'text-danger'
                  : 'text-primary'
              }
              rightIconClass="text-primary"
              rightProductHandler={cartProductItem}
              leftProductHandler={wishProductItem}
              {...product}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
