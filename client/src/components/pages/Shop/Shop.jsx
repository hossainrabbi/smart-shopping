import React from 'react';
import { Col, Container, Form, Navbar, Row } from 'react-bootstrap';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import useProduct from '../../../hooks/useProduct';

const Shop = () => {
  const { products, productList, wishProductItem, cartProductItem } =
    useProduct();

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={9}>
          <Navbar className="shadow-sm my-3 rounded-2">
            <Container>
              <Row className="w-100">
                <Col sm={4}>
                  <Form.Control type="text" placeholder="Search..." />
                </Col>
                <Col sm={8}>
                  <div className="d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex justify-content-between align-items-center w-50">
                      <span>Sort By:</span>
                      <Form.Select
                        aria-label="Default select example"
                        style={{ width: '150px' }}
                        value="default"
                      >
                        <option value="default">Default</option>
                        <option value="aToZ">A to Z</option>
                        <option value="zToA">Z to A</option>
                      </Form.Select>
                    </div>
                    <div></div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Navbar>
          <Row>
            {products?.products?.map((product) => (
              <Col xl={4} lg={6} key={product._id} className="mb-4">
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
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
