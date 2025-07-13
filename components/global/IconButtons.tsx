'use client';

// import HeartIcon from '@/public/icons/heart.svg';
import { signOutAction } from '@/app/lib/actions';
import ShopIcon from '@/public/icons/shop.svg';
import ProfileIcon from '@/public/icons/user.svg';
import { LogOut } from 'lucide-react';
import { IconButton } from './IconButton';

export const ActionButtons = () => {
  return (
    <div className='hidden md:flex justify-end w-1/4 gap-x-4 px-4 items-center'>
      <form action={signOutAction}>
        <button
          type='submit'
          className='flex items-center gap-2 rounded-md text-sm font-medium p-2 px-3 hover:bg-gray-100 transition-colors duration-200 text-dark-brown'
        >
          <LogOut className='w-4 h-4' />
          <span className='text-xs'>Sign Out</span>
        </button>
      </form>

      <IconButton
        icon={ProfileIcon}
        alt='calendar icon'
        title='Book Appointment'
        ariaLabel='Book Appointment'
        className='size-[1.2rem]'
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
};
