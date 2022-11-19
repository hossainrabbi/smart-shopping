import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import notFound from '../../../images/404.jpg';

const NotFound = () => {
  return (
    <div
      className="not__found mx-auto mt-3 text-center"
      style={{ maxWidth: '500px' }}
    >
      <img src={notFound} alt="notFound" className="w-100 h-100" />

      <Button as={Link} to="/">
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
