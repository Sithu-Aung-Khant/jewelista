import React from 'react';
import HeartIcon from '@/public/icons/heart.svg';
import ShopIcon from '@/public/icons/shop.svg';
import ProfileIcon from '@/public/icons/user.svg';
import { IconButton } from './IconButton';

export const ActionButtons = () => (
  <div className='hidden md:flex justify-end w-1/4 gap-x-4 px-4 items-center'>
    <IconButton
      icon={ProfileIcon}
      alt='calendar icon'
      title='Book Appointment'
      ariaLabel='Book Appointment'
      className='size-[1.2rem]'
    />
    <IconButton
      icon={HeartIcon}
      alt='heart icon'
      title='Wishlist'
      ariaLabel='Add to Wishlist'
      className='size-[1.2rem] mt-px'
    />
    <IconButton
      icon={ShopIcon}
      alt='shop icon'
      title='Shopping Cart'
      className='size-[0.9rem]'
      ariaLabel='View Shopping Cart'
    />
  </div>
);
