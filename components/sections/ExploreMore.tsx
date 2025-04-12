'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { categories } from '@/lib/categories';
import BgDesktop from '@/public/images/background/cta-bg-desktop.jpg';
import BgMobile from '@/public/images/background/cta-bg-mobile.jpg';
import ShareIcon from '@/public/icons/share.svg';

export default function ExploreMore() {
  return (
    <section className='w-full mb-20'>
      <div className='flex flex-col md:flex-row max-h-[420px] md:justify-between'>
        {/* Left Column - Guides */}
        <div className='md:w-[62%] px-4 mt-16 mb-5 md:mt-10 md:mb-0 md:px-12'>
          <motion.h2
            className='text-[26px] md:text-[32px] font-playfair-display mb-2'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Explore More
          </motion.h2>
          <motion.p
            className='text-light-brown text-sm font-dm-sans md:w-1/2'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Looking for more diamond guides, buying tips or details about the
            4Cs? Explore more of our diamond education pages:
          </motion.p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 mt-8 md:mt-5'>
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href='#'
                  className='group flex items-center md:my-1 justify-between hover:text-primary transition-colors duration-300'
                >
                  <span className='text-xs md:text-sm font-dm-sans text-dark-brown tracking-wide underline-offset-2 hover:underline '>
                    {category.title}
                  </span>
                  <Image
                    src={ShareIcon}
                    width={100}
                    height={100}
                    alt='share icon'
                    className='size-11 md:size-12'
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Image */}
        <motion.div
          className='md:w-[38%]'
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={BgDesktop}
            alt='Featured Jewelry'
            className='w-full h-max object-cover hidden md:block'
            unoptimized
            width={300}
            height={300}
            priority
          />
          <Image
            src={BgMobile}
            alt='Featured Jewelry'
            className='w-full h-max object-cover md:hidden'
            unoptimized
            width={300}
            height={300}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
