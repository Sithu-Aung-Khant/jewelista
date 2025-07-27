'use client';

import { signOutAction } from '@/app/lib/actions';
import ShopIcon from '@/public/icons/shop.svg';
import { LogOut } from 'lucide-react';
import { IconButton } from './IconButton';
import Link from 'next/link';

export const ActionButtons = () => {
  return (
    <div className='hidden md:flex md:w-52 justify-end w-1/4 gap-x-4 px-4 items-center'>
      <form action={signOutAction}>
        <button
          type='submit'
          className='flex items-center gap-2 rounded-md text-sm font-medium p-2 px-3 hover:bg-gray-100 transition-colors duration-200 text-dark-brown'
        >
          <LogOut className='w-4 h-4' />
          <span className='text-xs'>Sign Out</span>
        </button>
      </form>

      <Link href='/shopping-cart' passHref>
        <IconButton
          icon={ShopIcon}
          alt='shop icon'
          title='Shopping Cart'
          className='size-[0.9rem] md:size-[15px]'
          ariaLabel='View Shopping Cart'
        />
      </Link>
    </div>
  );
};
