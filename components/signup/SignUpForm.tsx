'use client';

import React, { useState, useEffect } from 'react';
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

  const [state, formAction] = useFormState<string | undefined, FormData>(
    signUp,
    undefined
  );

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
          onChange={(e) => setEmail(e.target.value)}
          className='bg-white border-border-brown text-dark-brown font-dm-sans'
          disabled={loading}
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
          autoComplete='new-password'
          placeholder='••••••••'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='bg-white border-border-brown text-dark-brown font-dm-sans'
          disabled={loading}
        />
      </div>
      <div>
        <label
          htmlFor='confirmPassword'
          className='block mb-1 text-sm font-dm-sans text-dark-brown'
        >
          Confirm Password
        </label>
        <Input
          id='confirmPassword'
          type='password'
          autoComplete='new-password'
          placeholder='••••••••'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='bg-white border-border-brown text-dark-brown font-dm-sans'
          disabled={loading}
        />
      </div>
      {clientError && (
        <p className='text-red-500 text-sm font-dm-sans'>{clientError}</p>
      )}
      {state && <p className='text-green-500 text-sm font-dm-sans'>{state}</p>}
      <Button type='submit' className='w-full mt-2' disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}
