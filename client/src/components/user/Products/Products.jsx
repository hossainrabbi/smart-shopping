import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Products.scss';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import useProduct from '../../../hooks/useProduct';
import Loading from '../../common/Loading';
import NoData from '../../common/NoData/NoData';

const Products = () => {
  const {
    products,
    productList,
    productGetLoading,
    productGetError,
    wishProductItem,
    cartProductItem,
  } = useProduct();

  return (
    <Container className="my-5">
      <ContentTitle title="Featured Products" />
      <Row>
        {productGetLoading ? (
          <Loading />
        ) : productGetError ? (
          <NoData title={productGetError} />
        ) : products?.products?.length > 6 ? (
          products?.products
            ?.filter((item) => item?.featured)
            ?.slice(0, 6)
            .map((product) => (
              <Col lg={4} md={6} key={product._id} className="mb-4">
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
        ) : (
          products?.products
            ?.filter((item) => item?.featured)
            ?.map((product) => (
              <Col lg={4} md={6} key={product._id} className="mb-4">
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
        )}
      </Row>
    </Container>
  );
};

export default Products;
