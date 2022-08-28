import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Products.scss';
import { getProducts } from '../../../redux/action/product-action';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import {
  addProductCartList,
  addProductWishList,
} from '../../../redux/action/product-list-action';

const Products = () => {
  const { products, productList } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const wishProductItem = (id) => {
    dispatch(addProductWishList(id, products?.products));
  };

  const cartProductItem = (id) => {
    dispatch(addProductCartList(id, products?.products));
  };

  return (
    <Container>
      <ContentTitle title="Our Products" />
      <Row>
        {products?.products?.map((product) => (
          <Col md={4} key={product._id} className="mb-4">
            <SingleProduct
              iconLeft={
                productList.wishList.some((item) => item._id === product._id)
                  ? FaHeart
                  : FaRegHeart
              }
              iconRight={FaShoppingCart}
              leftIconClass={
                productList.wishList.some((item) => item._id === product._id)
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
