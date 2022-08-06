import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {
  getProducts,
  removeProduct,
} from '../../../redux/action/product-action';
import SingleProduct from '../../common/SingleProduct/SingleProduct';
import Loading from '../../common/Loading';

const Products = () => {
  const products = useSelector((store) => store.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [editProduct, setEditProduct] = useState('');

  useEffect(() => {
    if (products?.isRemove) {
      toast.success('Product Remove Successfully');
    }

    if (products?.getError) {
      toast.error(products?.getError);
    }
  }, [products?.isRemove, products?.getError]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const removeProductItem = (id) => {
    dispatch(removeProduct(id));
  };

  const editProductItem = (id) => {
    navigate(`/admin/products/${id}`);
  };

  if (products?.getLoading) {
    return <Loading />;
  }

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
                rightProductHandler={removeProductItem}
                leftProductHandler={editProductItem}
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
