import React from 'react';
import CalendarIcon from '@/public/icons/calendar.svg';
import Image from 'next/image';

export const AppointmentButton = () => (
  <button className='flex items-center gap-x-2 uppercase text-xxs md:text-[10px] hover:opacity-80 transition-opacity'>
    <Image
      className='size-4'
      src={CalendarIcon}
      width={20}
      height={20}
      alt='calendar icon'
    />
  </button>
);
