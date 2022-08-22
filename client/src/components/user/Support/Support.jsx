import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { support } from '../../../data/home.data';
import './Support.scss';

const Support = () => {
  return (
    <Container className="mt-5">
      <Row>
        {support.map((supportItem) => (
          <Col className="support__area" md={4} key={supportItem.id}>
            <div className="text-center p-3">
              <img src={supportItem.image} alt={supportItem.title} />
              <h5 className="mt-3 mb-2">{supportItem.title}</h5>
              <p className="mb-0">{supportItem.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Support;
