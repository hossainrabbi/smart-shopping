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
import './SingleProductDetails.scss';

const SingleProductDetails = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [imageItem, setImageItem] = useState(0);

  const { singleProductLoading, singleProduct } = useSelector(
    (store) => store.products
  );
  const [productQty, setProductQty] = useState(0);
  const { productList, wishProductItem, cartProductItem } =
    useProduct(productQty);

  const thisProduct = productList.cartList.find(
    (product) => product._id === productId
  );

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    if (thisProduct) {
      setProductQty(parseInt(thisProduct?.qty));
    }
  }, [thisProduct]);

  if (singleProductLoading) {
    return <Loading />;
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <div className="product__image__area mx-auto">
            <img
              src={singleProduct?.images[imageItem]}
              alt={singleProduct?.productName}
              className="h-100"
            />
          </div>
        </Col>
        <Col md={6}>
          <h3>{singleProduct?.productName}</h3>
          <h5 className="price__item">
            <span className="mb-0 text-primary">
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
          <p className="my-2">
            {singleProduct?.description.length > 200
              ? `${singleProduct?.description.slice(0, 199)}...`
              : singleProduct?.description}
          </p>
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
              value={productQty}
              onChange={(e) => setProductQty(e.target.value)}
            />
            <Button
              className="py-1 px-3 d-flex align-items-center gap-2"
              onClick={() => cartProductItem(singleProduct?._id)}
            >
              <FaShoppingCart /> Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProductDetails;
