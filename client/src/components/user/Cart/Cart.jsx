import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineAdd } from 'react-icons/md';
import { HiMinus } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import './Cart.scss';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import discountPrice from '../../utils/discount';
import { removeFromCart } from '../../../redux/action/product-list-action';

const Cart = () => {
  const { productList } = useSelector((store) => store);
  const dispatch = useDispatch();

  const subTotal = (priceDiscount, qty) => (priceDiscount * qty).toFixed(2);
  console.log(productList);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Container>
      {productList?.cartList?.length > 0 ? (
        <>
          <ContentTitle title="Your cart items" />
          <Table striped bordered hover className="cart__table">
            <thead>
              <tr>
                <th>Image</th>
                <th>PRODUCT NAME</th>
                <th>UNIT PRICE</th>
                <th>InStock</th>
                <th>QTY</th>
                <th>SUBTOTAL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {productList?.cartList?.map((productItem) => (
                <tr key={productItem._id}>
                  <td>
                    <img
                      src={productItem.images[0]}
                      alt={productItem.productName}
                      className="w-100"
                    />
                  </td>
                  <td
                    style={{
                      textAlign: 'left',
                    }}
                  >
                    {productItem.productName}
                  </td>
                  <td>
                    <s className="text-muted">${productItem.price}</s> $
                    {discountPrice(productItem.price, productItem.discount)}
                  </td>
                  <td>{productItem.inStock}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <button className="btn">
                        <HiMinus />
                      </button>
                      <span>{productItem.qty}</span>
                      <button className="btn">
                        <MdOutlineAdd />
                      </button>
                    </div>
                  </td>
                  <td>
                    $
                    {subTotal(
                      discountPrice(productItem.price, productItem.discount),
                      productItem.qty
                    )}
                  </td>
                  <td>
                    <button
                      className="btn"
                      onClick={() => handleRemoveFromCart(productItem._id)}
                    >
                      <AiOutlineClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div className="text-center mt-4">
          Cart is empty! <Link to="/shop">Continue Shopping</Link>
        </div>
      )}
    </Container>
  );
};

export default Cart;
