'use client';
import React from 'react';
import { AppointmentButton } from './AppointmentButton';
import { ActionButtons } from './IconButtons';
import { motion } from 'framer-motion';

const Announcement = () => {
  return (
    <motion.div
      className='text-xxs w-full md:px-2 tracking-3 md:text-xs py-1.5 border md:flex justify-between border-b-2 border-border-brown text-center'
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className='hidden md:flex items-center w-1/4 gap-x-2 px-4'>
        <AppointmentButton />
      </div>
      <div className='flex items-center'>
        <span className='inline-block mx-2'>•</span>
        <span className='w-max md:text-[11px] tracking-wide'>
          Exclusive Collection Launch: Discover Timeless Elegance Today
        </span>
        <span className='inline-block mx-2'>•</span>
      </div>
      <ActionButtons />
    </motion.div>
  );
};

export default Announcement;
