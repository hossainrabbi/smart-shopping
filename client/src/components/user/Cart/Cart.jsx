import React from 'react';
import { Container, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineAdd } from 'react-icons/md';
import { HiMinus } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import './Cart.scss';
import ContentTitle from '../../common/ContentTitle/ContentTitle';
import discountPrice from '../../../utils/discount';
import {
  clearAllFromCart,
  decrementCartProductQty,
  incrementCartProductQty,
  removeFromCart,
} from '../../../redux/action/product-list-action';
import totalPrice from '../../../utils/totalPrice';
import subTotal from '../../../utils/subTotal';

const Cart = () => {
  const { productList } = useSelector((store) => store);
  const dispatch = useDispatch();

  const shippingFee = 75.0;
  const total = totalPrice(productList?.cartList, shippingFee);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const incrementProductQty = (id) => {
    dispatch(incrementCartProductQty(id));
  };

  const decrementProductQty = (id) => {
    dispatch(decrementCartProductQty(id));
  };

  const clearAll = () => {
    dispatch(clearAllFromCart());
  };

  return (
    <Container>
      {productList?.cartList?.length > 0 ? (
        <>
          <ContentTitle title="Your cart items" />
          <Table bordered className="cart__table">
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
                      <button
                        className="btn"
                        disabled={productItem.qty === 1}
                        onClick={() => decrementProductQty(productItem._id)}
                      >
                        <HiMinus />
                      </button>
                      <span>{productItem.qty}</span>
                      <button
                        className="btn"
                        disabled={productItem.qty === productItem.inStock}
                        onClick={() => incrementProductQty(productItem._id)}
                      >
                        <MdOutlineAdd />
                      </button>
                    </div>
                  </td>
                  <td className="price">
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
              <tr className="total__calculation">
                <td colSpan="5">Shipping Fee:</td>
                <td className="price">${shippingFee}</td>
                <td />
              </tr>
              <tr className="total__calculation">
                <td colSpan="5">Total:</td>
                <td className="price">${total}</td>
                <td>
                  <button className="btn" onClick={clearAll}>
                    Clear All
                  </button>
                </td>
              </tr>
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center">
            <Link className="btn btn-primary" to="/shop">
              Continue Shopping
            </Link>
            <Link className="btn btn-primary" to="/checkout">
              Proceed to Checkout
            </Link>
          </div>
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
