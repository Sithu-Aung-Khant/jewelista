'use client';

import { useMediaQuery } from '@react-hook/media-query';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/lib/testimonials';
export default function Testimonials() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <section className='w-full py-16 px-10 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.h2
          className='text-2.1xl mb-5 text-center font-playfair-display'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Testimonials
        </motion.h2>
        <Carousel
          opts={{
            align: 'start',
          }}
          className='w-full relative'
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className='md:basis-1/4'>
                <motion.div
                  className='py-14 px-10 border border-border-brown relative'
                  initial={{
                    opacity: 0,
                    y: isMobile ? 0 : 20,
                    scale: isMobile ? 0.95 : 1,
                  }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className='size-30 mx-auto mb-4 relative overflow-hidden '>
                    <Image
                      src={`/images/customers/${testimonial.id}.${testimonial.imageType}`}
                      alt={`${testimonial.name}`}
                      fill
                      className='object-cover'
                    />
                  </div>
                  <div className='text-center'>
                    <h3 className='font-medium text-dark-brown text-sm mb-1'>
                      {testimonial.name}
                    </h3>
                    <p className='text-[#505050] text-xs'>
                      {testimonial.position}
                    </p>
                    <p className='text-dark-brown text-sm mt-2'>
                      {testimonial.description}
                    </p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2' />
          <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2' />
          <CarouselDots className='mt-5' />
        </Carousel>
      </div>
    </section>
  );
}
