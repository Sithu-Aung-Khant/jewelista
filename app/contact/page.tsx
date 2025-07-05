'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/global/navbar';
import Footer from '@/components/sections/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Name
                  </label>
                  <Input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className='w-full'
                    placeholder='Your name'
                  />
                </div>
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-medium text-gray-700 mb-2'
                  >
                    Email
                  </label>
                  <Input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className='w-full'
                    placeholder='your.email@example.com'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='subject'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Subject
                </label>
                <Input
                  type='text'
                  id='subject'
                  name='subject'
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className='w-full'
                  placeholder='Subject of your message'
                />
              </div>

              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-2'
                >
                  Message
                </label>
                <Textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='w-full min-h-[120px]'
                  placeholder='Your message...'
                />
              </div>

              <div className='text-center'>
                <Button type='submit' className='px-8 py-3'>
                  Send Message
                </Button>
              </div>
            </form>
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
              <p className='text-gray-600'>+95 123 456 789</p>
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
