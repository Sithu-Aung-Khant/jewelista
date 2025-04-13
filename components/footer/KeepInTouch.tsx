'use client';

import PaymentMethods from '../global/PaymentMethods';
import { NewsletterSubscription } from './NewsletterSubscription';

export function KeepInTouch() {
  return (
    <div>
      <h3 className='font-semibold text-dark-brown mb-4'>
        Let&apos;s Keep In Touch
      </h3>
      <NewsletterSubscription />
      <PaymentMethods />
    </div>
  );
}
