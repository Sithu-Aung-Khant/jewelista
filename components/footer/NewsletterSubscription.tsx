import { useState } from 'react';
import { z } from 'zod';
import Image from 'next/image';

const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .max(100, 'Email must be less than 100 characters')
  .refine((email) => {
    const domain = email.split('@')[1];
    return !domain?.includes('..') && !domain?.startsWith('.');
  }, 'Invalid email format');

export const NewsletterSubscription = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      if (!email.includes('@')) {
        throw new Error('Please include "@" in the email address');
      }

      emailSchema.parse(email.trim());

      // Simulating sending email
      console.log(`Email sent to: ${process.env.EMAIL_ADDRESS}`);
      setSuccess('Thank you for subscribing!');
      setEmail('');

      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className='space-y-3' noValidate>
      <div className='relative'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email Address'
          className='w-full pl-4 bg-white py-2 border border-border-brown focus:outline-none focus:border-deep-blue text-sm font-dm-sans text-dark-brown'
          disabled={isSubmitting}
        />
        <button
          title='Subscribe to newsletter'
          type='submit'
          className='absolute h-full border right-0 top-1/2 -translate-y-1/2 bg-deep-blue text-white p-2 hover:bg-opacity-90 transition-colors disabled:opacity-50'
          disabled={isSubmitting}
          formNoValidate
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
      {success && (
        <p className='text-green-500 text-sm font-dm-sans'>{success}</p>
      )}
    </form>
  );
};
