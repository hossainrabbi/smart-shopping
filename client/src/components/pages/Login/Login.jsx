import React, { useEffect } from 'react';
import { Button, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FiLock } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginImage from '../../../images/login.jpg';
import InputFormGroup from '../../common/InputFormGroup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/action/auth-action';

const Login = () => {
  const auth = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (auth?.isLogged) {
      navigate(from, { replace: true });
    }
  }, [auth?.isLogged, navigate, from]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <img src={LoginImage} alt="LoginImage" />
        </Col>
        <Col md={6}>
          <h3 className="text-center mb-3">Login Your Account</h3>
          {auth?.error && (
            <Alert variant="danger" className="text-center text-capitalize">
              {auth?.error}
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputFormGroup
              icon={MdOutlineMailOutline}
              type="email"
              label="Email"
              {...register('email', {
                required: 'Email is required',
              })}
              error={errors.email}
            />
            <InputFormGroup
              icon={FiLock}
              type="password"
              label="Password"
              {...register('password', {
                required: 'Password is required',
              })}
              error={errors.password}
            />
            <Button
              disabled={auth?.loading}
              type="submit"
              className="w-100 py-2 my-2"
            >
              {auth?.loading ? 'Loading...' : 'Login Account'}
            </Button>
            <Form.Text className="text-center d-block" muted>
              Don't have any account? <Link to="/register">Register</Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
