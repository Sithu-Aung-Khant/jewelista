"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { products } from "@/lib/products";
import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import { ProductCard } from "../global/ProductCard";

export default function ProductList() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className='w-full py-16 px-10 md:px-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.h2
          className='text-3xl mb-10 text-center font-playfair-display'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Products
        </motion.h2>
        <Carousel opts={{ align: "start" }} className='w-full relative'>
          <CarouselContent>
            {products.map((product, index) => (
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
  );
}
