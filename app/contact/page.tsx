'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/global/navbar';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Phone, Send } from 'lucide-react';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);

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
      <Navbar />
      <section className='w-full py-16 px-10 md:px-8'>
        <div className='max-w-4xl mx-auto'>
          <motion.h2
            className='text-4xl mb-10 text-center font-playfair-display'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Contact Us
          </motion.h2>

          <motion.div
            className='bg-white rounded-lg shadow-lg p-8'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='space-y-6'>
              <h3 className='text-xl font-playfair-display text-dark-brown'>
                Contact Information
              </h3>

              <p className='text-sm text-gray-600'>
                Contact us using the phone numbers below to place an order and
                complete the checkout process.
              </p>
              <div className='grid grid-cols-2 gap-8'>
                <div>
                  <p className='text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 h-max rounded-lg font-medium'>
                    Please note that the numbers below are the only official
                    contact methods. Any other numbers you may encounter are not
                    legitimate and should not be trusted.
                  </p>
                  {/* Business Hours */}
                  <div className='border-t border-gray-200 pt-4'>
                    <h3 className='font-medium text-dark-brown mb-2'>
                      Business Hours
                    </h3>
                    <div className='space-y-1 text-sm text-gray-600'>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 9:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
                <div>
                  {/* Contact Methods */}
                  <div className='space-y-4'>
                    {/* Phone */}
                    <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                      <Phone className='w-5 h-5 text-dark-brown' />
                      <div>
                        <p className='font-medium text-dark-brown'>Phone</p>
                        <p className='text-sm text-gray-600'>
                          +95 995 540 2838
                        </p>
                      </div>
                    </div>

                    {/* Telegram */}
                    <button
                      onClick={() =>
                        window.open('https://t.me/urinzali', '_blank')
                      }
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
              </div>
              {/* Quick Contact Buttons */}
              <div className='space-y-3'>
                <Button
                  onClick={() => window.open('https://t.me/urinzali', '_blank')}
                  className='w-full text-white'
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div>
              <h3 className='text-xl font-semibold mb-2'>Address</h3>
              <p className='text-gray-600'>
                123 Jewelry Street
                <br />
                Myanmar, Yangon
              </p>
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>Phone</h3>
              <p className='text-gray-600'>+95 995 540 2838</p>
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>Email</h3>
              <p className='text-gray-600'>info@jewelista.com</p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
