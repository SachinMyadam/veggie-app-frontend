// File: src/app/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // ... (data fetching code remains the same)
    async function getProductsFromFirestore() {
      const productsCol = collection(db, "vegetables");
      const productSnapshot = await getDocs(productsCol);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    }
    getProductsFromFirestore();
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">Our Fresh Selection</h1>

      <input
        type="text"
        placeholder="Search for a vegetable..."
        className="mb-10 p-3 rounded-lg border border-gray-300 w-full focus:ring-2 focus:ring-emerald-400 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">{product.name}</h2>
                <p className="text-gray-500 mt-2 font-semibold">₹{product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}