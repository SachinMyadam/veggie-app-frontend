// File: src/components/CartDisplay.tsx
"use client";

import { useCart } from '../context/CartContext';
import Link from 'next/link'; // 1. Import Link

export default function CartDisplay() {
  const { cartItems } = useCart();

  return (
    // 2. Wrap the component in a Link to the cart page
    <Link href="/cart">
      <div className="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-10 hover:bg-gray-700 cursor-pointer">
        <h3 className="font-bold">Cart</h3>
        <p>Items: {cartItems.length}</p>
      </div>
    </Link>
  );
}