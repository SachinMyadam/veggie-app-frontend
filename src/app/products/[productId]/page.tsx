// File: src/app/products/[productId]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from 'next/navigation';
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from 'next/link';
import { useCart } from '../../../context/CartContext'; // 1. Import the useCart hook

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.productId as string;
  const { addToCart } = useCart(); // 2. Get the addToCart function
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    async function getProduct() {
      const docRef = doc(db, 'vegetables', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
      }
      setLoading(false);
    }
    getProduct();
  }, [productId]);

  if (loading) { return <div>Loading...</div>; }
  if (!product) { return <div>Product not found.</div>; }

  const handleAddToCart = () => {
    addToCart(product); // 3. Call the function from our context
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-5xl font-bold">{product.name}</h1>
      <p className="mt-4 text-2xl">₹{product.price}</p>

      <button 
  onClick={handleAddToCart}
  className="mt-8 rounded-lg bg-green-600 px-8 py-3 font-bold text-white hover:bg-green-700 transition-colors"
>
        Add to Cart
      </button>

      <div className="mt-12">
        <Link href="/products" className="rounded bg-gray-600 px-4 py-2 font-bold text-white hover:bg-gray-700">
          ← Back to All Products
        </Link>
      </div>
    </main>
  );
}