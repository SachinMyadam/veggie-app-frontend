// File: src/app/payment-success/page.tsx
"use client";

import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { useEffect } from 'react';

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []); // The empty array ensures this runs only once when the page loads

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Payment Successful!</h1>
      <p className="mt-4">Thank you for your order.</p>
      <div className="mt-8">
        <Link href="/products" className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}