import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import { useSelector, useDispatch } from 'react-redux';
import { FaRegHeart, FaHeart, FaShoppingCart } from 'react-icons/fa';
import './Products.scss';
import { getProducts } from '../../../redux/action/product-action';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import { addProductWishList } from '../../../redux/action/product-list-action';
import { useState } from 'react';

const Products = () => {
  const { products, productList } = useSelector((store) => store);
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const wishProductItem = (id) => {
    dispatch(addProductWishList(id, products?.products));
  };

  const cartProductItem = (id) => {
    const findProduct = products?.products.find(
      (product) => product._id === id
    );

    const findIndex = cart.findIndex(
      (product) => product._id === findProduct._id
    );

    if (findIndex === -1 && findProduct.inStock >= 1) {
      return setCart([...cart, { ...findProduct, qty: 1 }]);
    }

    if (
      findIndex !== -1 &&
      cart[findIndex].inStock >= 1 &&
      cart[findIndex].qty < cart[findIndex].inStock
    ) {
      cart[findIndex].qty = cart[findIndex].qty + 1;
      setCart([...cart]);
    }
  };

  console.log(cart);

  return (
    <Container>
      <ContentTitle title="Our Products" />
      <Row>
        {products?.products?.map((product) => (
          <Col md={4} key={product._id} className="mb-4">
            <SingleProduct
              iconLeft={
                productList.wishList.some((item) => item._id === product._id)
                  ? FaHeart
                  : FaRegHeart
              }
              iconRight={FaShoppingCart}
              leftIconClass={
                productList.wishList.some((item) => item._id === product._id)
                  ? 'text-danger'
                  : 'text-primary'
              }
              rightIconClass="text-primary"
              rightProductHandler={cartProductItem}
              leftProductHandler={wishProductItem}
              {...product}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;
