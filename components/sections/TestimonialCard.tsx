import Image from "next/image";
import { motion } from "framer-motion";
import { Testimonial } from "../../lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  isMobile: boolean;
}

export function TestimonialCard({
  testimonial,
  index,
  isMobile,
}: TestimonialCardProps) {
  return (
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
      <div className='size-30 mx-auto mb-4 relative overflow-hidden'>
        <Image
          src={`/images/customers/${testimonial.id}.${testimonial.imageType}`}
          alt={`${testimonial.name}`}
          fill
          unoptimized
          className='object-cover'
        />
      </div>
      <div className='text-center'>
        <h3 className='font-medium text-dark-brown text-sm mb-1'>
          {testimonial.name}
        </h3>
        <p className='text-[#505050] text-xs'>{testimonial.position}</p>
        <p className='text-dark-brown text-sm mt-2 line-clamp-3 overflow-ellipsis overflow-hidden'>
          {testimonial.description}
        </p>
      </div>
    </motion.div>
  );
}
