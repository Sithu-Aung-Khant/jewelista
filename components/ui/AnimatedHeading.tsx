'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.h2
      className='text-4xl mb-10 text-center font-playfair-display'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.h2>
  );
}
