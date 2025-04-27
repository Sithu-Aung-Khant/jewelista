"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

export function ProductDetailsNavbar() {
  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-brown'>
      <div className='container mx-auto px-4 max-w-7xl'>
        <div className='flex items-center justify-between h-20'>
          {/* Left Side - Logo */}
          <Link href='/' className='flex items-center'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative'
            >
              <h1 className='text-2xl font-playfair-display text-dark-brown'>
                MyJewel
              </h1>
            </motion.div>
          </Link>

          {/* Right Side - Cart Icon */}
          <Link href='/shopping-cart' className='relative'>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='flex items-center gap-2 px-4 py-2 rounded-full border border-border-brown hover:bg-gray-50 transition-colors'
            >
              <ShoppingCart className='w-5 h-5 text-dark-brown' />
              <span className='text-sm font-medium text-dark-brown'>Cart</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
