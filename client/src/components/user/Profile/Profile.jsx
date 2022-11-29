import React from 'react';
import { useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../common/Loading';
import NoData from '../../common/NoData/NoData';
import { getProfile } from '../../../redux/action/profile.action';

const Profile = () => {
  const { profile, getError, getLoading } = useSelector(
    (state) => state.profile
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  console.log(profile);

  return (
    <Container>
      {getLoading ? (
        <Loading />
      ) : getError ? (
        <NoData title={getError} />
      ) : (
        <form>
          <h2 className="text-center my-5">Update your profile</h2>
          <Row className="align-items-center">
            <Col md={4}>
              <img src={profile?.avatar} alt={profile?.username} />
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Full Name"
                  name="name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Name"
                  name="username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="productName">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" disabled />
              </Form.Group>
            </Col>
          </Row>
        </form>
      )}
    </Container>
  );
};

export default Profile;
