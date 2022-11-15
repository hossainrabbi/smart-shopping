import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  FaStar,
  FaStarHalf,
  FaRegHeart,
  FaHeart,
  FaShoppingCart,
} from 'react-icons/fa';
import { getSingleProduct } from '../../../redux/action/product-action';
import discountPrice from '../../../utils/discount';
import formatCurrency from '../../../utils/formatCurrency';
import Loading from '../../common/Loading';
import useProduct from '../../../hooks/useProduct';

const SingleProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { singleProductLoading, singleProduct } = useSelector(
    (store) => store.products
  );
  const { products, productList, wishProductItem, cartProductItem } =
    useProduct();
  const [imageItem, setImageItem] = useState(0);

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);

  console.log(singleProduct);

  if (singleProductLoading) {
    return <Loading />;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <img
            src={singleProduct?.images[imageItem]}
            alt={singleProduct?.productName}
          />
        </Col>
        <Col md={6}>
          <h3>{singleProduct?.productName}</h3>
          <h5>
            <span className="mb-0 text-primary">
              $
              {formatCurrency.format(
                discountPrice(singleProduct?.price, singleProduct?.discount)
              )}
            </span>
            {singleProduct?.discount > 0 && (
              <span className="mb-0 ms-2 text-muted">
                <s>{formatCurrency.format(singleProduct?.price)}</s>
              </span>
            )}
          </h5>
          <div className="d-flex align-items-center">
            <ReactStars
              emptyIcon={<FaStar />}
              fullIcon={<FaStar />}
              halfIcon={<FaStarHalf />}
              activeColor="#ffa534"
              color={'#dddddd'}
              size={25}
              value={singleProduct?.ratting}
              edit={false}
              isHalf
              classNames="me-1"
            />

            <span>({singleProduct?.review})</span>
          </div>
          <div className="py-2">
            {productList.wishList.some(
              (item) => item._id === singleProduct?._id
            ) ? (
              <button
                className="btn d-flex align-items-center border-0 gap-2 ps-0"
                onClick={() => wishProductItem(singleProduct?._id)}
              >
                <FaHeart className="text-danger" /> Remove from wishlist
              </button>
            ) : (
              <button
                className="btn d-flex align-items-center border-0 gap-2 ps-0"
                onClick={() => wishProductItem(singleProduct?._id)}
              >
                <FaRegHeart className="text-primary" /> Add to wishlist
              </button>
            )}
          </div>
          <div className="d-flex align-items-center gap-2 mt-2">
            <input
              type="number"
              className="py-1 px-2 rounded text-center d-inline-block"
              min={0}
              max={singleProduct?.inStock}
            />
            <Button className="py-1 px-3">Add to Cart</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProductDetails;
