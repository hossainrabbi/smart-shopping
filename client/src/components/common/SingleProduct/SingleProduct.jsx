import React from 'react';
import { Card } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import './SingleProduct.scss';
import discountPrice from '../../utils/discount';
import formatCurrency from '../../utils/formatCurrency';

const SingleProduct = ({
  images,
  _id,
  discount,
  price,
  productName,
  category,
  iconLeft: IconLeft,
  iconRight: IconRight,
  leftIconClass,
  rightIconClass,
  rightProductHandler,
  leftProductHandler,
}) => {
  const calculatePrice = discountPrice(price, discount);

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
        <small className="text-muted text-capitalize my-2 d-inline-block">
          {category}
        </small>
        <Card.Title>{productName}</Card.Title>
        {/* <Card.Text className="mb-0">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </Card.Text> */}
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            {discount > 0 && (
              <h6 className="mb-0 me-2 text-muted">
                <s>{formatCurrency.format(price)}</s>
              </h6>
            )}
            <h5 className="mb-0 text-primary">
              ${formatCurrency.format(calculatePrice)}
            </h5>
          </div>
          <div className="d-flex align-items-center">
            <ReactStars
              emptyIcon={<FaStar />}
              fullIcon={<FaStar />}
              halfIcon={<FaStarHalf />}
              activeColor="#ffa534"
              size={25}
              value={3.5}
              edit={false}
              isHalf
              // char={<FaStar />}
              classNames="me-1"
            />

            <span>(5)</span>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span
            className={`btn border-0 ${leftIconClass}`}
            onClick={() => leftProductHandler(_id)}
          >
            <IconLeft />
          </span>
          <span
            className={`btn border-0 ${rightIconClass}`}
            onClick={() => rightProductHandler(_id)}
          >
            <IconRight />
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;
