'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FooterLink } from '../footer/FooterLink';

export function TermsAndConditions() {
  return (
    <motion.div
      className='pt-6 gap-4'
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className='bg-border-brown h-px my-3 hidden md:block'></div>{' '}
      <div className='md:flex justify-between'>
        <p className='text-dark-brown hidden md:block md:text-sm w-max text-[10px]'>
          © 2025, All Rights Reserved - Jewelista
        </p>
        <div className='flex justify-between md:justify-end md:gap-x-4'>
          <div className='flex items-center text-xxs md:text-xs gap-3 text-dark-brown'>
            <FooterLink href='/terms'>Terms & Conditions</FooterLink>
            <FooterLink href='/privacy'>Privacy Policy</FooterLink>
            <FooterLink href='/sitemap'>Site Map</FooterLink>
          </div>
          <div className='flex gap-4 items-center'>
            <FooterLink href='https://facebook.com'>
              <Image
                src='/icons/social/LiaFacebook.svg'
                alt='Facebook'
                width={20}
                height={20}
                className='size-[18px] md:size-6'
              />
            </FooterLink>
            <FooterLink href='https://instagram.com'>
              <Image
                src='/icons/social/LiaInstagram.svg'
                alt='Instagram'
                width={20}
                height={20}
                className='size-[18px] md:size-6'
              />
            </FooterLink>
          </div>
        </div>
      </div>
      <div className='bg-border-brown h-px my-3 md:hidden'></div>
      <p className='text-dark-brown text-sm text-center w-full md:hidden text-[10px]'>
        © 2025, All Rights Reserved - Jewelista
      </p>
    </motion.div>
  );
}
