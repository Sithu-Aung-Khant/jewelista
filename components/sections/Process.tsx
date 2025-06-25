'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { processSteps } from '@/lib/processSteps';

export default function Process() {
  return (
    <section className='w-full px-4 md:px-8 bg-white font-dm-sans'>
      <div className='pt-6 text-sm max-w-7xl mx-auto'>
        <span className='text-light-brown'>Home</span>
        <span className='mx-2'>/</span>
        <span className=''>Jewelry</span>
      </div>
      <div className='max-w-7xl mx-auto py-14'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12'>
          <div className='space-y-3'>
            <h2 className='text-3xl tracking-wide md:text-4xl font-playfair-display text-darkest-brown'>
              Jewelry
            </h2>
            <p className='text-dark-brown text-sm md:text-xl font-dm-sans tracking-wider md:leading-relaxed md:w-2/3 md:py-5'>
              Discover Our Collection: Timeless Jewelry for Every Occasion
            </p>
            <Image
              src='/images/products/products.jpg'
              alt='Jewelry Collection'
              width={300}
              height={300}
              unoptimized
              className='object-cover w-full max-w-lg h-max hidden md:block'
            />
          </div>

          <div className='md:mt-2'>
            <p className='text-dark-brown md:text-base pb-10 pl-2 pr-4 text-sm tracking-wider hidden md:block'>
              Explore our curated selection of exquisite jewelry—crafted with
              passion, designed to shine, and perfect for every style.
            </p>
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className='flex gap-4'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className='flex-shrink-0 w-8 h-8  flex items-center justify-center'>
                  <span className='text-sm font-dm-sans'>
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className='font-medium md:text-2xl font-dm-sans text-darkest-brown tracking-wider'>
                    {step.title}
                  </h3>
                  <p className='text-sm md:text-base md:pt-2 pb-3 md:pb-8 mb-4 md:mb-8 border-b text-light-brown mt-1'>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className='text-dark-brown text-sm tracking-wider md:hidden'>
            Explore our curated selection of exquisite jewelry—crafted with
            passion, designed to shine, and perfect for every style.
          </p>
          <Image
            src='/images/products/products.jpg'
            alt='Jewelry Collection'
            width={300}
            height={300}
            unoptimized
            className='object-cover w-full max-w-lg h-max md:hidden'
          />
        </div>
      </div>
    </section>
  );
}
