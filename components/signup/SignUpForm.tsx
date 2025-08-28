'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { signUp } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [clientError, setClientError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email validation state
  const [emailError, setEmailError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Password validation state
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [hasPasswordInteracted, setHasPasswordInteracted] = useState(false);

  // Confirm password validation state
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [hasConfirmPasswordInteracted, setHasConfirmPasswordInteracted] =
    useState(false);

  // Refs for debouncing
  const emailTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const passwordTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [state, formAction] = useFormState<string | undefined, FormData>(
    signUp,
    undefined
  );

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password: string) => {
    return password.length >= 6;
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

  // Debounced password validation
  const debouncedPasswordValidation = (value: string) => {
    if (passwordTimeoutRef.current) {
      clearTimeout(passwordTimeoutRef.current);
    }

    passwordTimeoutRef.current = setTimeout(() => {
      if (value === '') {
        setPasswordError('');
        setIsPasswordValid(false);
      } else if (!validatePassword(value)) {
        setPasswordError('Password must be at least 6 characters long');
        setIsPasswordValid(false);
      } else {
        setPasswordError('');
        setIsPasswordValid(true);
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

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    // Only validate if user has interacted with the field
    if (hasPasswordInteracted) {
      debouncedPasswordValidation(value);
    }

    // Check if confirm password matches when password changes
    if (hasConfirmPasswordInteracted && confirmPassword !== '') {
      if (value !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match');
        setIsConfirmPasswordValid(false);
      } else {
        setConfirmPasswordError('');
        setIsConfirmPasswordValid(true);
      }
    }
  };

  // Handle password field blur
  const handlePasswordBlur = () => {
    setHasPasswordInteracted(true);
    if (password !== '') {
      if (!validatePassword(password)) {
        setPasswordError('Password must be at least 6 characters long');
        setIsPasswordValid(false);
      } else {
        setPasswordError('');
        setIsPasswordValid(true);
      }
    }
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (hasConfirmPasswordInteracted) {
      if (value === '') {
        setConfirmPasswordError('');
        setIsConfirmPasswordValid(false);
      } else if (value !== password) {
        setConfirmPasswordError('Passwords do not match');
        setIsConfirmPasswordValid(false);
      } else {
        setConfirmPasswordError('');
        setIsConfirmPasswordValid(true);
      }
    }
  };

  // Handle confirm password field blur
  const handleConfirmPasswordBlur = () => {
    setHasConfirmPasswordInteracted(true);
    if (confirmPassword !== '') {
      if (confirmPassword !== password) {
        setConfirmPasswordError('Passwords do not match');
        setIsConfirmPasswordValid(false);
      } else {
        setConfirmPasswordError('');
        setIsConfirmPasswordValid(true);
      }
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (emailTimeoutRef.current) {
        clearTimeout(emailTimeoutRef.current);
      }
      if (passwordTimeoutRef.current) {
        clearTimeout(passwordTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (state === 'success') {
      router.push(
        '/login?success=Account created successfully! Please sign in.'
      );
    }
  }, [state, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClientError('');
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      setClientError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setClientError('Passwords do not match.');
      setLoading(false);
      return;
    }
    if (!isEmailValid && hasInteracted) {
      setClientError('Please enter a valid email address.');
      setLoading(false);
      return;
    }
    if (!isPasswordValid && hasPasswordInteracted) {
      setClientError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    try {
      await formAction(formData);
    } finally {
      setLoading(false);
    }
  };

  // Check if form can be submitted
  const canSubmit =
    name !== '' &&
    email !== '' &&
    password !== '' &&
    confirmPassword !== '' &&
    password === confirmPassword &&
    (isEmailValid || !hasInteracted) &&
    (isPasswordValid || !hasPasswordInteracted) &&
    (isConfirmPasswordValid || !hasConfirmPasswordInteracted);

  return (
    <form onSubmit={handleSubmit} className='space-y-5 w-full'>
      <div>
        <label
          htmlFor='name'
          className='block mb-1 text-sm font-dm-sans text-dark-brown'
        >
          Name
        </label>
        <Input
          id='name'
          type='text'
          name='name'
          autoComplete='name'
          placeholder='Your Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='bg-white border-border-brown text-dark-brown font-dm-sans'
          disabled={loading}
          required
        />
      </div>
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
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          className={`bg-white border-border-brown text-dark-brown font-dm-sans ${
            hasInteracted && emailError
              ? 'border-red-500'
              : hasInteracted && isEmailValid
              ? 'border-green-500'
              : ''
          }`}
          disabled={loading}
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
        <div className='relative'>
          <Input
            id='password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            autoComplete='new-password'
            placeholder='••••••••'
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            className={`bg-white border-border-brown text-dark-brown font-dm-sans pr-10 ${
              hasPasswordInteracted && passwordError
                ? 'border-red-500'
                : hasPasswordInteracted && isPasswordValid
                ? 'border-green-500'
                : ''
            }`}
            disabled={loading}
            required
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
            disabled={loading}
          >
            {showPassword ? (
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                />
              </svg>
            ) : (
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            )}
          </button>
        </div>
        {hasPasswordInteracted && passwordError && (
          <p className='text-sm text-red-500 font-dm-sans mt-1'>
            {passwordError}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor='confirmPassword'
          className='block mb-1 text-sm font-dm-sans text-dark-brown'
        >
          Confirm Password
        </label>
        <div className='relative'>
          <Input
            id='confirmPassword'
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete='new-password'
            placeholder='••••••••'
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            className={`bg-white border-border-brown text-dark-brown font-dm-sans pr-10 ${
              hasConfirmPasswordInteracted && confirmPasswordError
                ? 'border-red-500'
                : hasConfirmPasswordInteracted && isConfirmPasswordValid
                ? 'border-green-500'
                : ''
            }`}
            disabled={loading}
            required
          />
          <button
            type='button'
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none'
            disabled={loading}
          >
            {showConfirmPassword ? (
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21'
                />
              </svg>
            ) : (
              <svg
                className='w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>
            )}
          </button>
        </div>
        {hasConfirmPasswordInteracted && confirmPasswordError && (
          <p className='text-sm text-red-500 font-dm-sans mt-1'>
            {confirmPasswordError}
          </p>
        )}
      </div>
      {clientError && (
        <p className='text-red-500 text-sm font-dm-sans'>{clientError}</p>
      )}
      {state && <p className='text-green-500 text-sm font-dm-sans'>{state}</p>}
      <Button
        type='submit'
        className='w-full mt-2'
        disabled={loading || !canSubmit}
        aria-disabled={loading || !canSubmit}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}
