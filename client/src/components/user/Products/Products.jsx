import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Products.scss';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import useProduct from '../../../hooks/useProduct';

const Products = () => {
  const { products, productList, wishProductItem, cartProductItem } =
    useProduct();

  return (
    <Container className="my-5">
      <ContentTitle title="Our Products" />
      <Row>
        {products?.products?.length > 6
          ? products?.products
              ?.filter((item) => item?.featured)
              ?.slice(0, 6)
              .map((product) => (
                <Col md={4} key={product._id} className="mb-4">
                  <SingleProduct
                    iconLeft={
                      productList.wishList.some(
                        (item) => item._id === product._id
                      )
                        ? FaHeart
                        : FaRegHeart
                    }
                    iconRight={FaShoppingCart}
                    leftIconClass={
                      productList.wishList.some(
                        (item) => item._id === product._id
                      )
                        ? 'text-danger'
                        : 'text-primary'
                    }
                    rightIconClass="text-primary"
                    rightProductHandler={cartProductItem}
                    leftProductHandler={wishProductItem}
                    {...product}
                    showDetails
                  />
                </Col>
              ))
          : products?.products?.map((product) => (
              <Col md={4} key={product._id} className="mb-4">
                <SingleProduct
                  iconLeft={
                    productList.wishList.some(
                      (item) => item._id === product._id
                    )
                      ? FaHeart
                      : FaRegHeart
                  }
                  iconRight={FaShoppingCart}
                  leftIconClass={
                    productList.wishList.some(
                      (item) => item._id === product._id
                    )
                      ? 'text-danger'
                      : 'text-primary'
                  }
                  rightIconClass="text-primary"
                  rightProductHandler={cartProductItem}
                  leftProductHandler={wishProductItem}
                  {...product}
                  showDetails
                />
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default Products;
