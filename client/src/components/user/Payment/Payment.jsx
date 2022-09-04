import React from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    console.log(error, paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <br />
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!stripe || !elements}
      >
        Pay ${total}
      </button>
    </form>
  );
};

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const Payment = ({ total }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm total={total} />
    </Elements>
  );
};

export default Payment;
