'use client';

import React from 'react';
// import HeartIcon from '@/public/icons/heart.svg';
import ShopIcon from '@/public/icons/shop.svg';
import ProfileIcon from '@/public/icons/user.svg';
import { IconButton } from './IconButton';
import { signOutAction } from '@/app/lib/actions';
import { LogIn, LogOut } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const ActionButtons = () => {
  const { data: session } = useSession();

  // Log authentication status
  console.log('Authentication Status:', {
    isLoggedIn: !!session,
    session: session,
    user: session?.user,
  });

  return (
    <div className='hidden md:flex justify-end w-1/4 gap-x-4 px-4 items-center'>
      {session ? (
        <form action={signOutAction}>
          <button
            type='submit'
            className='flex items-center gap-2 rounded-md text-sm font-medium p-2 px-3 hover:bg-gray-100 transition-colors duration-200 text-dark-brown'
          >
            <LogOut className='w-4 h-4' />
            <span className='text-xs'>Sign Out</span>
          </button>
        </form>
      ) : (
        <Link href='/login'>
          <button className='flex items-center gap-2 rounded-md text-sm font-medium p-2 px-3 hover:bg-gray-100 transition-colors duration-200 text-dark-brown'>
            <LogIn className='w-4 h-4' />
            <span className='text-xs'>Sign In</span>
          </button>
        </Link>
      )}
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
