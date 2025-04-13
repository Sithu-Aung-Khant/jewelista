'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TbMenu2 from '@/public/icons/TbMenu2.svg';
import Logo from '@/public/icons/logo.svg';
import { IconButton } from './IconButton';
import HeartIcon from '@/public/icons/heart.svg';
import ShopIcon from '@/public/icons/shop.svg';
import SearchIcon from '@/public/icons/search.svg';
import CalendarIcon from '@/public/icons/calendar.svg';
import { NAV_ITEMS } from '@/lib/navigationItems';

const Navigation = () => (
  <motion.nav
    className='flex items-center justify-between h-14 border-b shadow-md'
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
  >
    <div className='flex gap-x-2.5 pl-2 w-1/4 md:hidden'>
      <IconButton
        icon={TbMenu2}
        alt='menu'
        title='menu'
        ariaLabel='Add to Wishlist'
        className='size-5'
      />
      <IconButton
        icon={CalendarIcon}
        alt='heart icon'
        title='Wishlist'
        ariaLabel='Add to Wishlist'
        className='size-4'
      />
    </div>
    <Link href='/' className='flex-shrink-0 md:px-8 py-3 md:border-r-2'>
      <Image
        src={Logo}
        alt='MyJewel Logo'
        className='md:h-8 h-6 w-auto'
        priority
      />
    </Link>
    <div className='hidden md:flex items-center gap-x-8 text-[13px] tracking-wider'>
      {NAV_ITEMS.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
        >
          <Link
            href={item.href}
            className='hover:text-primary transition-colors hover:scale-105 inline-block'
          >
            {item.label}
          </Link>
        </motion.div>
      ))}
    </div>
    <div className='flex h-full w-1/4 md:hover:cursor-pointer md:pr-8 md:pl-4 pr-2 py-3 md:border-l-2 md:w-max justify-end items-center gap-x-2.5'>
      <IconButton
        icon={HeartIcon}
        alt='heart icon'
        title='Wishlist'
        ariaLabel='Add to Wishlist'
        className='size-5 -mb-0.5 md:hidden'
      />
      <IconButton
        icon={ShopIcon}
        alt='shop icon'
        title='Shopping Cart'
        ariaLabel='View Shopping Cart'
        className='size-4 md:hidden'
      />
      <IconButton
        icon={SearchIcon}
        alt='heart icon'
        title='Wishlist'
        ariaLabel='Add to Wishlist'
        className='size-6 -mb-0.5'
      />
    </div>
  </motion.nav>
);
export default Navigation;
