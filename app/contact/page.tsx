'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, Send } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900'></div>
      </div>
    );
  }

  return (
    <main className=''>
      {/* <Navbar /> */}
      <div className='container px-6 py-6'>
        <div className='flex items-center gap-4'>
          <motion.button
            onClick={() => router.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='flex items-center gap-2 px-3 py-2 rounded-full border border-border-brown hover:bg-gray-50 transition-colors'
            aria-label='Go back'
          >
            <ArrowLeft className='w-4 h-4 text-dark-brown' />
            <span className='text-sm font-medium text-dark-brown'>Back</span>
          </motion.button>
        </div>
      </div>
      <section className='w-full md:w-1/2 mx-auto px-10 md:px-8'>
        <div className='max-w-4xl mx-auto'>
          <motion.h2
            className='text-4xl mb-10 text-center font-playfair-display'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact Jewelista
          </motion.h2>

          <div className='border border-border-brown p-6 rounded-lg space-y-6'>
            <h2 className='text-xl font-playfair-display text-dark-brown'>
              Contact Information
            </h2>

            <p className='text-sm text-gray-600'>
              Contact us using the phone numbers below to place an order and
              complete the checkout process.
            </p>
            <p className='text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-lg font-medium'>
              Please note that the numbers below are the only official contact
              methods. Any other numbers you may encounter are not legitimate
              and should not be trusted.
            </p>

            {/* Contact Methods */}
            <div className='space-y-4'>
              {/* Phone */}
              <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                <Phone className='w-5 h-5 text-dark-brown' />
                <div>
                  <p className='font-medium text-dark-brown'>Phone</p>
                  <p className='text-sm text-gray-600'>+95 995 540 2838</p>
                </div>
              </div>

              {/* Telegram */}
              <button
                onClick={() => window.open('https://t.me/urinzali', '_blank')}
                className='flex items-center w-full gap-3 p-3 bg-gray-50 rounded-lg'
              >
                <Send className='w-5 h-5 text-blue-500' />
                <div>
                  <p className='font-medium text-dark-brown'>Telegram</p>
                  <p className='text-sm text-gray-600'>@urinzali</p>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Contact Buttons */}
          <div className='space-y-3 mt-4'>
            <Button
              onClick={() => window.open('https://t.me/urinzali', '_blank')}
              className='w-full md:py-5 text-white'
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
