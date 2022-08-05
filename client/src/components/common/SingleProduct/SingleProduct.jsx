import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';
import './SingleProduct.scss';

const SingleProduct = ({
  images,
  description,
  discount,
  price,
  productName,
  iconLeft: IconLeft,
  iconRight: IconRight,
  leftIconClass,
  rightIconClass,
}) => {
  const calculatePrice = parseFloat(
    (price - (price * discount) / 100).toFixed(2)
  );

  return (
    <Card className="shadow-sm single__product">
      <div className="product__image position-relative">
        <Card.Img variant="top" src={images[0]} />
        {discount > 0 && (
          <small className="position-absolute px-2 bg-danger text-white">
            {discount}%
          </small>
        )}
      </div>
      <Card.Body className="py-0">
        <Card.Title className="mt-3">{productName}</Card.Title>
        <Card.Text className="mb-0">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </Card.Text>
        <div className="mt-2 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            {discount > 0 && (
              <h6 className="mb-0 me-2 text-muted">
                <s>${price}</s>
              </h6>
            )}
            <h5 className="mb-0 text-primary">${calculatePrice}</h5>
          </div>
          <div className="d-flex align-items-center">
            <Rating
              readonly
              emptySymbol={<FaStar className="light__color" />}
              fullSymbol={<FaStar className="orange__color" />}
              initialRating={4.5}
              className="mb-2 me-1"
            />
            <span>(5)</span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className={`btn border-0 ${leftIconClass}`}>
            <IconLeft />
          </span>
          <span className={`btn border-0 ${rightIconClass}`}>
            <IconRight />
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
