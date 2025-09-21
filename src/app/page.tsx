// File: src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
        Fresh Vegetables, Delivered.
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
        Welcome to the Veggie App. We provide the freshest, locally-sourced produce delivered directly to your door.
      </p>
      <div className="mt-8">
        <Link href="/products" className="rounded-md bg-green-600 px-8 py-3 font-bold text-white hover:bg-green-700 transition-colors">
          Browse Our Products
        </Link>
      </div>
    </div>
  );
}