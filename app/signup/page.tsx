import { Suspense } from 'react';
import SignUpForm from '../../components/signup/SignUpForm';
import Image from 'next/image';
import BgImage from '@/public/images/background/circle-desktop.jpg';

export default function SignUpPage() {
  return (
    <main className='relative flex items-center justify-center min-h-screen bg-offwhite'>
      {/* Background Image */}
      <Image
        src={BgImage}
        alt='Background'
        unoptimized
        className='object-cover bottom-0 right-0 absolute w-max h-max z-0'
        priority
      />
      {/* Foreground Content */}
      <div className='relative z-10 mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-6 md:-mt-32 bg-white border border-border-brown rounded-xl shadow-lg'>
        <div className='text-center mb-2'>
          <h1 className='text-3xl font-playfair-display text-dark-brown mb-2'>
            Create your account
          </h1>
          <p className='text-sm text-light-brown font-dm-sans'>
            Sign up to get started with Jewelista
          </p>
        </div>
        <Suspense>
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}
