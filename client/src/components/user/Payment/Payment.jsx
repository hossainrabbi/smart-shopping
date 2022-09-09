import React from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const CheckoutForm = ({ total, addressInfo, purchasedProduct }) => {
  const stripe = useStripe();
  const elements = useElements();

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

    if (paymentMethod) {
      const submitInfo = {
        address: { ...addressInfo },
        paymentId: paymentMethod.id,
        purchasedProduct,
        totalPrice: total,
      };

      console.log(submitInfo);
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
          disabled={!stripe || !elements}
        >
          Pay ${total}
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
