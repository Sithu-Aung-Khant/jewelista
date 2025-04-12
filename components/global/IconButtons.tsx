import React from 'react';
import CalendarIcon from '@/public/icons/calendar.svg';
import HeartIcon from '@/public/icons/heart.svg';
import ShopIcon from '@/public/icons/shop.svg';
import { IconButton } from './IconButton';

export const ActionButtons = () => (
  <div className='hidden md:flex justify-end w-1/4 gap-x-4 px-4 items-center'>
    <IconButton
      icon={CalendarIcon}
      alt='calendar icon'
      title='Book Appointment'
      ariaLabel='Book Appointment'
    />
    <IconButton
      icon={HeartIcon}
      alt='heart icon'
      title='Wishlist'
      ariaLabel='Add to Wishlist'
      className='size-5 -mb-[1.2px]'
    />
    <IconButton
      icon={ShopIcon}
      alt='shop icon'
      title='Shopping Cart'
      ariaLabel='View Shopping Cart'
    />
  </div>
);
