import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, getDivision } from '../../../redux/action/address.action';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import discountPrice from '../../utils/discount';
import subTotal from '../../utils/subTotal';
import totalPrice from '../../utils/totalPrice';
import Payment from '../Payment/Payment';
import './Checkout.scss';

const Checkout = () => {
  const [division, setDivision] = useState('Choose...');
  const [city, setCity] = useState('Choose...');
  const [upozilla, setUpozilla] = useState('Choose...');
  const { auth, address, productList } = useSelector((store) => store);
  const dispatch = useDispatch();

  const shippingFee = 75.0;

  useEffect(() => {
    dispatch(getDivision());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCity(division));
  }, [dispatch, division]);

  return (
    <Container>
      <ContentTitle title="Checkout" />
      <Row>
        <Col md={8}>
          <h3 className="mb-4">Your information:</h3>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="fName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="John" />
              </Form.Group>

              <Form.Group as={Col} controlId="lName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" placeholder="Doe" />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={auth?.user?.user?.email}
                disabled
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone No:</Form.Label>
              <Form.Control type="number" placeholder="880170000000" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control placeholder="1234 Main Apartment, studio, or floor" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country:</Form.Label>
              <Form.Control value="Bangladesh" disabled />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="divisions">
                <Form.Label>Divisions:</Form.Label>
                <Form.Select
                  defaultValue={division}
                  onChange={(e) => setDivision(e.target.value)}
                >
                  <option disabled>Choose...</option>
                  {address?.divisions?.map((item) => (
                    <option key={item._id} value={item.division}>
                      {item.division}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Select
                  defaultValue={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option disabled>Choose...</option>
                  {address?.city?.map((item) => (
                    <option key={item._id} value={item.district}>
                      {item.district}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Upazilla:</Form.Label>
                <Form.Select
                  defaultValue={upozilla}
                  onChange={(e) => setUpozilla(e.target.value)}
                >
                  <option disabled>Choose...</option>
                  {address?.city
                    ?.find((cityItem) => cityItem.district === city)
                    ?.upazilla?.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Row>
          </Form>
        </Col>
        <Col md={4}>
          <h3 className="mb-4">Your order:</h3>
          <div className="order__area">
            <p>
              <b>Product</b> <b className="price__site">Total</b>
            </p>
            <hr />
            {productList?.cartList?.map((product) => (
              <p key={product._id}>
                <span key={product._id}>
                  {product.productName} X {product.qty}
                </span>
                <span className="price__site">
                  $
                  {subTotal(
                    discountPrice(product.price, product.discount),
                    product.qty
                  )}
                </span>
              </p>
            ))}
            <hr />
            <p>
              <span>Shipping Fee:</span>{' '}
              <span className="price__site">${shippingFee}</span>
            </p>
            <hr />
            <p>
              <b>Total:</b>{' '}
              <b className="price__site">
                ${totalPrice(productList?.cartList, shippingFee)}
              </b>
            </p>
          </div>
          <br />
          <Payment />
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
