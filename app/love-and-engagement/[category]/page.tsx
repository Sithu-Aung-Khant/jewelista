'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/global/navbar';
import Footer from '@/components/sections/Footer';
import { products } from '@/app/lib/products';
import { useMediaQuery } from '@react-hook/media-query';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/global/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function LoveAndEngagementCategoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const category = params.category as string;
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter products based on category
  const filteredProducts =
    category && category !== 'all'
      ? products.filter((product) => {
          if (category === 'engagement-rings') {
            return (
              product.category === 'Rings' &&
              product.name.toLowerCase().includes('engagement')
            );
          } else if (category === 'wedding-rings') {
            return (
              product.category === 'Rings' &&
              product.name.toLowerCase().includes('wedding')
            );
          }
          return false;
        })
      : products.filter(
          (product) =>
            product.category === 'Rings' &&
            (product.name.toLowerCase().includes('engagement') ||
              product.name.toLowerCase().includes('wedding'))
        );

  // Format category name for display
  const formatCategoryName = (cat: string) => {
    if (cat === 'all') return 'Love & Engagement';
    if (cat === 'engagement-rings') return 'Engagement Rings';
    if (cat === 'wedding-rings') return 'Wedding Rings';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
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
        <div className='max-w-7xl mx-auto'>
          <motion.h2
            className='text-4xl mb-10 text-center font-playfair-display'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {formatCategoryName(category)}
          </motion.h2>
          <Carousel opts={{ align: 'start' }} className='w-full relative'>
            <CarouselContent>
              {filteredProducts.map((product, index) => (
                <CarouselItem key={product.id} className='md:basis-1/4'>
                  <ProductCard
                    product={product}
                    index={index}
                    isMobile={isMobile}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className='absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2' />
            <CarouselNext className='absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2' />
            <CarouselDots className='mt-10' />
          </Carousel>
        </div>
      </section>
      <Footer />
    </main>
  );
}
