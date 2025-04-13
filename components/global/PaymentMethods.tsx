import Image from 'next/image';

export default function PaymentMethods() {
  return (
    <div className='mt-8'>
      <p className='text-dark-brown font-semibold mb-3'>Payment Methods</p>
      <div className='flex gap-4 items-center'>
        <Image
          src='/icons/payment/visa.svg'
          alt='Visa'
          width={40}
          className='border py-1 px-1.5 border-border-brown rounded-md w-11 h-8'
          height={25}
        />
        <Image
          src='/icons/payment/master.svg'
          alt='Mastercard'
          width={40}
          className='border py-2 px-1.5 border-border-brown rounded-md w-11 h-8'
          height={25}
        />
        <Image
          src='/icons/payment/amex.svg'
          alt='American Express'
          width={40}
          className='border py-1.5 px-1 border-border-brown rounded-md w-11 h-8'
          height={25}
        />
        <Image
          src='/icons/payment/apple.svg'
          alt='Apple Pay'
          width={40}
          className='border py-2 px-1.5 border-border-brown rounded-md w-auto h-8'
          height={25}
        />
        <Image
          src='/icons/payment/teddy.svg'
          alt='Tether'
          width={40}
          className='border py-2 border-border-brown rounded-md w-11 h-8'
          height={25}
        />
      </div>
    </div>
  );
}
