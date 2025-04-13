'use client';
import { Construction } from 'lucide-react';

export default function Custom404() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Construction className='w-16 h-16 mb-4 text-dark-brown' />
      <h1 className='text-4xl  my-4 font-playfair-display font-semibold text-dark-brown mb-4'>
        Under Development
      </h1>
      <p className='text text-dark-brown font-dm-sans mb-2'>
        The page you&apos;re looking for is currently under development.
      </p>
    </div>
  );
}
