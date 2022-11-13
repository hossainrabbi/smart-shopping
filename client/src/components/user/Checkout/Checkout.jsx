import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, getDivision } from '../../../redux/action/address.action';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import discountPrice from '../../../utils/discount';
import subTotal from '../../../utils/subTotal';
import totalPrice from '../../../utils/totalPrice';
import Payment from '../Payment/Payment';
import './Checkout.scss';

const Checkout = () => {
  const [nextInfo, setNextInfo] = useState(false);
  const { auth, address, productList } = useSelector((store) => store);
  const dispatch = useDispatch();

  const [addressInfo, setAddressInfo] = useState({
    firstName: '',
    lastName: '',
    phoneNo: '',
    address: '',
    division: 'Choose...',
    city: 'Choose...',
    upozilla: 'Choose...',
    email: auth?.user?.user?.email,
    country: 'Bangladesh',
  });

  const [errorAddressInfo, setErrorAddressInfo] = useState({
    division: false,
    city: false,
    upozilla: false,
  });

  const handleFormInputChange = (e) => {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
  };

  const shippingFee = 75.0;

  useEffect(() => {
    dispatch(getDivision());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCity(addressInfo.division));
  }, [dispatch, addressInfo.division]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (addressInfo.division === 'Choose...') {
      return setErrorAddressInfo({
        division: true,
      });
    }

    if (addressInfo.city === 'Choose...') {
      return setErrorAddressInfo({
        city: true,
      });
    }

    if (addressInfo.upozilla === 'Choose...') {
      return setErrorAddressInfo({
        upozilla: true,
      });
    }

    setErrorAddressInfo({});
    setNextInfo(true);
  };

  const total = totalPrice(productList?.cartList, shippingFee);

  return (
    <Container>
      <ContentTitle title="Checkout" />
      {!nextInfo ? (
        <div className="w-75 m-auto">
          <h3 className="mb-4">Your information:</h3>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="fName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={addressInfo.firstName}
                  onChange={handleFormInputChange}
                  placeholder="John"
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="lName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={addressInfo.lastName}
                  onChange={handleFormInputChange}
                  placeholder="Doe"
                  required
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={addressInfo.email}
                disabled
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="phone">
              <Form.Label>Phone No:</Form.Label>
              <Form.Control
                type="number"
                name="phoneNo"
                value={addressInfo.phoneNo}
                onChange={handleFormInputChange}
                placeholder="880170000000"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={addressInfo.address}
                onChange={handleFormInputChange}
                placeholder="1234 Main Apartment, studio, or floor"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="country">
              <Form.Label>Country:</Form.Label>
              <Form.Control
                type="text"
                value={addressInfo.country}
                disabled
                readOnly
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="divisions">
                <Form.Label>Divisions:</Form.Label>
                <Form.Select
                  name="division"
                  defaultValue={addressInfo.division}
                  onChange={handleFormInputChange}
                  required
                >
                  <option disabled>Choose...</option>
                  {address?.divisions?.map((item) => (
                    <option key={item._id} value={item.division}>
                      {item.division}
                    </option>
                  ))}
                </Form.Select>
                {errorAddressInfo.division && (
                  <Form.Text className="text-danger">
                    Please Choose Division
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="city">
                <Form.Label>City:</Form.Label>
                <Form.Select
                  name="city"
                  defaultValue={addressInfo.city}
                  onChange={handleFormInputChange}
                  required
                >
                  <option disabled>Choose...</option>
                  {address?.city?.map((item) => (
                    <option key={item._id} value={item.district}>
                      {item.district}
                    </option>
                  ))}
                </Form.Select>
                {errorAddressInfo.city && (
                  <Form.Text className="text-danger">
                    Please Choose City
                  </Form.Text>
                )}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Upazilla:</Form.Label>
                <Form.Select
                  name="upozilla"
                  defaultValue={addressInfo.upozilla}
                  onChange={handleFormInputChange}
                  required
                >
                  <option disabled>Choose...</option>
                  {address?.city
                    ?.find((cityItem) => cityItem.district === addressInfo.city)
                    ?.upazilla?.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </Form.Select>
                {errorAddressInfo.upozilla && (
                  <Form.Text className="text-danger">
                    Please Choose Upozilla
                  </Form.Text>
                )}
              </Form.Group>
            </Row>
            <div className="text-end">
              <button className="btn btn-primary" type="submit">
                Next
              </button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="w-50 m-auto">
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
              <span>Shipping Fee:</span>
              <span className="price__site">${shippingFee}</span>
            </p>
            <hr />
            <p>
              <b>Total:</b>
              <b className="price__site">${total}</b>
            </p>
          </div>
          <br />
          <Payment
            total={total}
            addressInfo={addressInfo}
            purchasedProduct={productList?.cartList}
          />
        </div>
      )}
    </Container>
  );
};

export default Checkout;
