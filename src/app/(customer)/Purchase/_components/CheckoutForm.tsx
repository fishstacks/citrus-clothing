"use client";

import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { StripeError, PaymentIntent } from '@stripe/stripe-js';
import { Product } from '@prisma/client';




interface CartItem extends Product {
  quantity: number;
}

interface CheckoutFormProps {
  cartItems: CartItem[];
  cartTotal: number;
}


function CheckoutForm({ cartItems, cartTotal }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          cartItems,
          cartTotal,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Failed to create order.');
        setLoading(false);
        return;
      }


      const confirmResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'https://your-website.com/order-complete',
          payment_method_data: {
            billing_details: {
              email: email,
            },
          },
        },
      }) as { error?: StripeError, paymentIntent?: PaymentIntent };

      if (confirmResult.error) {
        setError(confirmResult.error.message || 'Payment confirmation failed.');
      } else if (confirmResult.paymentIntent) {
        console.log('Payment successful:', confirmResult.paymentIntent);
      }

    } catch (error: any) {
      setError(error.message || 'Something went wrong with the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PaymentElement />

      {error && <div>{error}</div>}

      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
}

export default CheckoutForm;
