'use client';

import Image from 'next/image';
// import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className='relative w-full md:h-[420px]'>
      <Image
        src='/images/background/hero-bg-desktop.jpg'
        alt='Hero Background'
        unoptimized
        width={1920}
        height={1080}
        className='object-cover w-full h-max hidden md:block'
        priority
      />
      <Image
        src='/images/background/hero-bg-mobile.jpg'
        alt='Hero Background Mobile'
        unoptimized
        width={768}
        height={576}
        className='object-cover w-full h-max md:hidden'
        priority
      />
      {/* <div className='absolute inset-0 flex flex-col items-center justify-center text-center px-4'>
        <motion.h1
          className='text-4xl md:text-5xl tracking-wider mb-8 md:mr-14 md:mt-8 font-playfair-display'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Custom Jewelry
        </motion.h1>
        <motion.p
          className='text-lg md:text-xl mb-8 max-w-2xl font-dm-sans'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Create Your Masterpiece: Bespoke Jewelry Crafted for You
        </motion.p>
      </div> */}
    </section>
  );
}
