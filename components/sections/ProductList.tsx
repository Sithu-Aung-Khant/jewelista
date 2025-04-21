"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from "@/lib/testimonials";
import { useMediaQuery } from "@react-hook/media-query";
import { motion } from "framer-motion";
import { TestimonialCard } from "./TestimonialCard";

export default function Testimonials() {
  const isMobile = useMediaQuery("(max-width: 768px)");

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
        <Carousel opts={{ align: "start" }} className='w-full relative'>
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className='md:basis-1/4'>
                <TestimonialCard
                  testimonial={testimonial}
                  index={index}
                  isMobile={isMobile}
                />
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
