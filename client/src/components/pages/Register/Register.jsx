import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import RegisterImage from '../../../images/register.jpg';
import InputFormGroup from '../../common/InputFormGroup';

const Register = () => {
  return (
    <Container>
      <Row className="align-items-center">
        <Col md={6}>
          <img src={RegisterImage} alt="RegisterImage" />
        </Col>
        <Col md={6}>
          <Form>
            <InputFormGroup icon={FaRegUser} label="Username" />
            <InputFormGroup icon={MdOutlineMailOutline} label="Email" />
            <InputFormGroup icon={FiLock} label="Password" />

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
