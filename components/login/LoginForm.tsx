'use client';

import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className='space-y-5 w-full'>
      <div>
        <label
          htmlFor='email'
          className='block mb-1 text-sm font-dm-sans text-dark-brown'
        >
          Email
        </label>
        <Input
          id='email'
          type='email'
          name='email'
          autoComplete='email'
          placeholder='you@example.com'
          className='bg-white border-border-brown text-dark-brown font-dm-sans'
          required
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block mb-1 text-sm font-dm-sans text-dark-brown'
        >
          Password
        </label>
        <Input
          id='password'
          type='password'
          name='password'
          autoComplete='current-password'
          placeholder='••••••••'
          className='bg-white border-border-brown text-dark-brown font-dm-sans'
          required
        />
      </div>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <Button type='submit' className='mt-2 w-full'>
        Log in
      </Button>
      <div>
        {errorMessage && (
          <p className='text-sm text-red-500 font-dm-sans'>{errorMessage}</p>
        )}
        <p className='text-sm mt-2'>
          Don&apos;t have an account?{' '}
          <a
            href='/signup'
            className='text-grey-600 underline hover:text-blue-800'
          >
            Sign up
          </a>
        </p>
      </div>
    </form>
  );
}
