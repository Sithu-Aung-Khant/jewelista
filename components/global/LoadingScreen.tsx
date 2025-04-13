'use client';

import { motion } from 'framer-motion';

export function LoadingScreen() {
  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-center justify-center bg-white'
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className='flex flex-col items-center'>
        <div className='flex gap-2'>
          <div className='size-1.5  bg-dark-brown rounded-full animate-bounce [animation-delay:-0.45s]' />
          <div className='size-1.5 bg-dark-brown rounded-full animate-bounce [animation-delay:-0.3s]' />
          <div className='size-1.5 bg-dark-brown rounded-full animate-bounce [animation-delay:-0.15s]' />
          <div className='size-1.5 bg-dark-brown rounded-full animate-bounce' />
        </div>
      </div>
    </motion.div>
  );
}
