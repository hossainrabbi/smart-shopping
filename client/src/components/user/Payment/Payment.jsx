import React from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { clearOrder, createOrder } from '../../../redux/action/order-action';
import { useEffect } from 'react';
import { clearAllFromCart } from '../../../redux/action/product-list-action';
import formatCurrency from '../../../utils/formatCurrency';

const CheckoutForm = ({ total, addressInfo, purchasedProduct }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (order.isOrder) {
      swal('Product Order Successfully!', {
        icon: 'success',
      }).then(() => {
        navigate('/');
      });

      dispatch(clearOrder());
      dispatch(clearAllFromCart());
    }
  }, [order.isOrder, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      return toast.error(error.message);
    }

    if (purchasedProduct.length === 0) {
      return toast.error('Cart is empty!');
    }

    if (!user?._id) {
      return toast.error('Please login again!');
    }

    if (paymentMethod) {
      const submitInfo = {
        paymentId: paymentMethod.id,
        userId: user?._id,
        purchasedProduct,
        address: { ...addressInfo },
        totalPrice: total,
      };

      dispatch(createOrder(submitInfo));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <br />
      <div className="text-end">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!stripe || !elements || order?.createLoading}
        >
          {order?.createLoading
            ? 'Loading...'
            : `Pay ${formatCurrency.format(total)}`}
        </button>
      </div>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Payment = ({ total, addressInfo, purchasedProduct }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        total={total}
        addressInfo={addressInfo}
        purchasedProduct={purchasedProduct}
      />
    </Elements>
  );
};

export default Payment;
