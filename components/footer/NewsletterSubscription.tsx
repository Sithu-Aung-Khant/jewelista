import { useState } from 'react';
import { z } from 'zod';
import Image from 'next/image';

const emailSchema = z.string().email('Please enter a valid email address');

export const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(email);
      setError('');
      setEmail('');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      }
    }
  };

  return (
    <form onSubmit={handleSubscribe} className='space-y-3'>
      <div className='relative'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
          className='w-full pl-4 bg-white py-2 border border-border-brown focus:outline-none focus:border-deep-blue text-sm font-dm-sans text-dark-brown'
        />
        <button
          title='Subscribe to newsletter'
          type='submit'
          className='absolute h-full border right-0 top-1/2 -translate-y-1/2 bg-deep-blue text-white p-2 hover:bg-opacity-90 transition-colors'
        >
          <Image
            src='/icons/VscSend.svg'
            alt='Subscribe'
            className='h-full w-full'
            width={20}
            height={20}
          />
        </button>
      </div>
      {error && <p className='text-red-500 text-sm font-dm-sans'>{error}</p>}
    </form>
  );
};
