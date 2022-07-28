import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import RegisterImage from '../../../images/register.jpg';
import InputFormGroup from '../../common/InputFormGroup';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <img src={RegisterImage} alt="RegisterImage" />
        </Col>
        <Col md={6}>
          <h3 className="text-center mb-3">Create an Account</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputFormGroup
              icon={FaRegUser}
              label="Username"
              {...register('username', { required: 'Username is required' })}
              error={errors.username}
            />
            <InputFormGroup
              icon={MdOutlineMailOutline}
              label="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  // eslint-disable-next-line no-useless-escape
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: 'Invalid email address',
                },
              })}
              error={errors.email}
            />
            <InputFormGroup
              icon={FiLock}
              label="Password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /(?=.*[!#$%&?^*@~() "])(?=.{6,})/,
                  message:
                    'Password must contain a letter, number, special character, and at least 6 characters',
                },
              })}
              error={errors.password}
            />

            <Button type="submit" className="w-100 py-2 my-2">
              Create Account
            </Button>

            <Form.Text className="text-center d-block" muted>
              Already have an account? <Link to="/login">Login</Link>
            </Form.Text>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
