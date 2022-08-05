import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getProducts } from '../../../redux/action/product-action';
import SingleProduct from '../../common/SingleProduct/SingleProduct';

const Products = () => {
  const products = useSelector((store) => store.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products);

  return (
    <div className="section__area p-3">
      {products?.products?.length > 0 ? (
        <Row>
          {products?.products.map((product) => (
            <Col className="mb-4" md={4} key={product._id}>
              <SingleProduct
                iconLeft={FaEdit}
                iconRight={FaTrash}
                leftIconClass="text-success"
                rightIconClass="text-danger"
                {...product}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div>Product Not Found</div>
      )}
    </div>
  );
};

export default Products;
