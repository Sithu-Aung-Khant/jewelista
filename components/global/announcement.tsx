'use client';
import React from 'react';

import { motion } from 'framer-motion';

const Announcement = () => {
  return (
    <motion.div
      className='text-xxs w-full md:px-2 tracking-3 md:text-xs py-1.5 border md:flex justify-between border-b-2 border-border-brown text-center'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    ></motion.div>
  );
};

export default Announcement;
