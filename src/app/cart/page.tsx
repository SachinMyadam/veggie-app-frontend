// File: src/app/cart/page.tsx
"use client";

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// The CheckoutForm now just handles submitting the payment
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.');
    }
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <PaymentElement />
      <button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full mt-4 rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  );
};

// The CartPage now handles fetching the clientSecret
export default function CartPage() {
  const { cartItems } = useCart(); // Correct
  const [clientSecret, setClientSecret] = useState<string>('');
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  useEffect(() => {
    if (total > 0) {
      fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total * 100 }), // Amount in paise
      })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret));
    }
  }, [cartItems]);

  const options = { clientSecret };

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>
      {cartItems.length > 0 ? (
        <div className="w-full max-w-md">
          <h2 className="text-2xl mb-4">Order Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold text-xl mt-2 border-t pt-2">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <div className="mt-8">
            {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="mt-12">
        <Link href="/products" className="text-gray-400 hover:text-white">
          ← Back to Products
        </Link>
      </div>
    </main>
  );
}