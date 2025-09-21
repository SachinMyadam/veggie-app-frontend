// File: src/components/Navbar.tsx
import Link from 'next/link';
import CartDisplay from './CartDisplay';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-slate-800 hover:text-green-600">
          Veggie App
        </Link>
        <CartDisplay />
      </nav>
    </header>
  );
}