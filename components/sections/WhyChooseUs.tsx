'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { whyChooseUsFeatures } from '@/lib/whyChooseUsFeatures';
import CircleMobile from '@/public/images/background/circle-mobile.svg';
import CircleDesktop from '@/public/images/background/circle-desktop.svg';

export default function WhyChooseUs() {
  return (
    <section className='w-full py-24 px-4 md:px-8 mb-20 h-max bg-offwhite relative overflow-hidden'>
      {/* Background Circles */}
      <Image
        src={CircleMobile}
        alt='Background circle'
        className='object-contain absolute bottom-0 md:hidden right-0'
      />
      <Image
        src={CircleDesktop}
        alt='Background circle'
        className='object-contain hidden md:absolute bottom-0 right-0 w-[742px] h-max'
      />

      <div className='max-w-7xl mx-auto relative'>
        <div className='text-center mb-16'>
          <motion.h2
            className='text-3xl md:text-4xl font-playfair-display mb-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose MyJewel?
          </motion.h2>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {whyChooseUsFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className='bg-white p-6 shadow-sm text-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className='size-9 md:size-11 mx-auto mb-3.5 relative'>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className='object-contain'
                />
              </div>
              <h3 className='md:text-xl text-deep-blue md:mb-4 md:mt-6 tracking-wide font-playfair-display font-semibold mb-3'>
                {feature.title}
              </h3>
              <p className='text-light-brown md:px-8 md:text-base text-sm tracking-wide font-dm-sans'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
