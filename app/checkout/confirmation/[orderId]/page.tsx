'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function OrderConfirmationPage({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  return (
    <div className='container mx-auto px-4 py-16 text-center max-w-2xl'>
      <motion.div
        className='space-y-6'
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex justify-center'>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className='h-16 w-16 text-green-500' />
          </motion.div>
        </div>

        <h1 className='text-3xl font-playfair-display text-dark-brown'>
          Thank You for Your Order!
        </h1>

        <p className='text-gray-600'>
          Your order has been confirmed. Order number:
        </p>

        <p className='text-lg font-medium text-dark-brown bg-gray-50 py-2 px-4 rounded-md inline-block'>
          {orderId}
        </p>

        <p className='text-gray-600'>
          We&apos;ll send you an email confirmation with order details and
          tracking information once your order ships.
        </p>

        <div className='pt-8'>
          <Link href='/'>
            <Button className='bg-dark-brown hover:bg-dark-brown/90 text-white'>
              Continue Shopping
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
