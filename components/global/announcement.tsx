import React from 'react';
import { AppointmentButton } from './AppointmentButton';
import { ActionButtons } from './IconButtons';

const Announcement = () => {
  return (
    <div className='text-xxs tracking-3 md:text-xs py-1.5 border md:flex justify-between border-b-2 border-border-brown text-center'>
      <div className='hidden md:flex items-center w-1/4 gap-x-2 px-4'>
        <AppointmentButton />
      </div>
      <div>
        <span className='inline-block mx-2'>•</span>
        <span className='w-max'>
          Exclusive Collection Launch: Discover Timeless Elegance Today
        </span>
        <span className='inline-block mx-2'>•</span>
      </div>
      <ActionButtons />
    </div>
  );
};

export default Announcement;
