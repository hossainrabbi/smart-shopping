import React from 'react';
import { Card } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { FaStar, FaStarHalf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SingleProduct.scss';
import discountPrice from '../../../utils/discount';
import formatCurrency from '../../../utils/formatCurrency';

const SingleProduct = ({
  images,
  _id,
  discount,
  price,
  productName,
  category,
  ratting,
  review,
  iconLeft: IconLeft,
  iconRight: IconRight,
  leftIconClass,
  rightIconClass,
  rightProductHandler,
  leftProductHandler,
  showDetails,
}) => {
  const navigate = useNavigate();
  const handleProductDetails = (id) => {
    navigate(`/shop/${id}`);
  };

  return (
    <Card className="shadow-sm single__product">
      <div
        className={`product__image position-relative ${
          showDetails ? 'cursor-pointer' : ''
        }`}
        onClick={showDetails ? () => handleProductDetails(_id) : null}
      >
        <Card.Img variant="top" style={{ height: '230px' }} src={images[0]} />
        {discount > 0 && (
          <small className="position-absolute px-2 bg-danger text-white">
            {discount}%
          </small>
        )}
      </div>
      <Card.Body className="py-0">
        <small
          className={`text-muted text-capitalize my-2 d-inline-block ${
            showDetails ? 'cursor-pointer' : ''
          }`}
          onClick={showDetails ? () => handleProductDetails(_id) : null}
        >
          {category}
        </small>
        <Card.Title
          onClick={showDetails ? () => handleProductDetails(_id) : null}
          className={showDetails ? 'cursor-pointer' : ''}
        >
          {productName}
        </Card.Title>
        {/* <Card.Text className="mb-0">
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </Card.Text> */}
        <div
          className={`d-flex align-items-center justify-content-between flex-wrap ${
            showDetails ? 'cursor-pointer' : ''
          }`}
          onClick={showDetails ? () => handleProductDetails(_id) : null}
        >
          <div className="d-flex align-items-center price__item">
            {discount > 0 && (
              <h6 className="mb-0 me-2 text-muted">
                <s>{formatCurrency.format(price)}</s>
              </h6>
            )}
            <h5 className="mb-0 text-primary">
              {formatCurrency.format(discountPrice(price, discount))}
            </h5>
          </div>
          <div className="d-flex align-items-center">
            <ReactStars
              emptyIcon={<FaStar />}
              fullIcon={<FaStar />}
              halfIcon={<FaStarHalf />}
              activeColor="#ffa534"
              color={'#dddddd'}
              size={25}
              value={ratting}
              edit={false}
              isHalf
              // char={<FaStar />}
              classNames="me-1"
            />

            <span>({review})</span>
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
