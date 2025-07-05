'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { useRouter } from 'next/navigation';

export function ProductDetailsNavbar() {
  const { cartItems } = useShoppingCart();
  const router = useRouter();
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleBack = () => {
    router.back();
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-brown'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='flex items-center justify-between h-20'>
          {/* Left Side - Back Button and Logo */}
          <div className='flex items-center gap-4'>
            <motion.button
              onClick={handleBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2 px-3 py-2 rounded-full border border-border-brown hover:bg-gray-50 transition-colors'
              aria-label='Go back'
            >
              <ArrowLeft className='w-4 h-4 text-dark-brown' />
              <span className='text-sm font-medium text-dark-brown'>Back</span>
            </motion.button>

            <Link href='/' className='flex items-center'>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='relative'
              >
                <h1 className='text-2xl font-playfair-display text-dark-brown'>
                  Jewelista
                </h1>
              </motion.div>
            </Link>
          </div>

          {/* Right Side - Cart Icon */}
          <Link href='/shopping-cart' className='relative'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2 px-4 py-2 rounded-full border border-border-brown hover:bg-gray-50 transition-colors'
            >
              <ShoppingCart className='w-5 h-5 text-dark-brown' />
              <span className='text-sm font-medium text-dark-brown'>Cart</span>
              {totalItems > 0 && (
                <span className='absolute -top-2 -right-2 bg-dark-brown text-white text-xs font-medium w-5 h-5 rounded-full flex items-center justify-center'>
                  {totalItems}
                </span>
              )}
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
