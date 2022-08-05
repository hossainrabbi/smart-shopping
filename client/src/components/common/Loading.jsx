import React from 'react';
import { Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <Row className="w-100 h-100 justify-content-center align-items-center">
      <ReactLoading type="spin" className="loading__color" />
    </Row>
  );
};

export default Loading;
