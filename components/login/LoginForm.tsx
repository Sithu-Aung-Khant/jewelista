'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useFormState(
    authenticate,
    undefined
  );

  // Email validation state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Refs for debouncing
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Debounced email validation
  const debouncedEmailValidation = (value: string) => {
    if (emailTimeoutRef.current) {
      clearTimeout(emailTimeoutRef.current);
    }

    emailTimeoutRef.current = setTimeout(() => {
      if (value === '') {
        setEmailError('');
        setIsEmailValid(false);
      } else if (!validateEmail(value)) {
        setEmailError('Please enter a valid email address');
        setIsEmailValid(false);
      } else {
        setEmailError('');
        setIsEmailValid(true);
      }
    }, 500); // 500ms delay
  };

  // Handle email input change
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Only validate if user has interacted with the field
    if (hasInteracted) {
      debouncedEmailValidation(value);
    }
  };

  // Handle email field blur (when user leaves the field)
  const handleEmailBlur = () => {
    setHasInteracted(true);
    if (email !== '') {
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address');
        setIsEmailValid(false);
      } else {
        setEmailError('');
        setIsEmailValid(true);
      }
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (emailTimeoutRef.current) {
        clearTimeout(emailTimeoutRef.current);
      }
    };
  }, []);

  // Check if form can be submitted
  const canSubmit = email !== '' && (isEmailValid || !hasInteracted);

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
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          autoComplete='email'
          placeholder='you@example.com'
          className={`bg-white border-border-brown text-dark-brown font-dm-sans ${
            hasInteracted && emailError
              ? 'border-red-500'
              : hasInteracted && isEmailValid
              ? 'border-green-500'
              : ''
          }`}
          required
        />
        {hasInteracted && emailError && (
          <p className='text-sm text-red-500 font-dm-sans mt-1'>{emailError}</p>
        )}
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
      <Button
        type='submit'
        className='mt-2 w-full'
        aria-disabled={isPending || !canSubmit}
        disabled={!canSubmit}
      >
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
