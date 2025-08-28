'use client';
import { NAV_ITEMS } from '@/app/lib/navigationItems';
import TbMenu2 from '@/public/icons/TbMenu2.svg';
import ShopIcon from '@/public/icons/shop.svg';
import { motion } from 'framer-motion';
import { ChevronDown, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { IconButton } from './IconButton';
import MobileNav from './MobileNav';
import { ActionButtons } from './IconButtons';
import { signOutAction } from '../../app/lib/actions';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
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
            ariaLabel='Open menu'
            className='size-6'
            onClick={() => setIsMobileMenuOpen(true)}
          />
        </div>
        <Link
          href='/'
          className='flex-shrink-0 md:w-52  md:px-8 py-3 md:border-r-2'
        >
          <span className='text-4xl font-playfair-display'>Jewelista</span>
        </Link>
        <div className='hidden md:flex items-center gap-x-8 text-[13px] tracking-wider'>
          {NAV_ITEMS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
              className='relative group'
            >
              {item.hasDropdown ? (
                <div className='relative group'>
                  <button className='hover:text-primary transition-colors py-3 inline-flex items-center gap-1'>
                    {item.label}
                    <ChevronDown className='h-4 w-4 transition-transform group-hover:rotate-180' />
                  </button>
                  <div className='absolute left-0 top-full mt-1 w-48 bg-white border shadow-lg opacity-0 invisible transform -translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-out z-50'>
                    {item.subcategories?.map((subcategory) => (
                      <Link
                        key={subcategory.label}
                        href={subcategory.href}
                        className='block px-4 py-2 hover:bg-gray-100 transition-colors'
                      >
                        {subcategory.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  className='hover:text-primary transition-colors hover:scale-105 inline-block'
                >
                  {item.label}
                </Link>
              )}
            </motion.div>
          ))}
        </div>
        <ActionButtons />
        <div className='flex h-full w-1/4 md:hidden md:hover:cursor-pointer md:pr-8 md:pl-4 pr-2 py-3 md:w-max justify-end items-center gap-x-2.5'>
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
              ariaLabel='View Shopping Cart'
              className='size-5 md:hidden'
            />
          </Link>
        </div>
      </motion.nav>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Navigation;
