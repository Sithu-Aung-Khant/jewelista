'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { Button } from '@/components/ui/button';
import { Loader2, X } from 'lucide-react';
import { products } from '@/lib/products';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ayapay from '@/public/payment/aya.jpeg';
import cbpay from '@/public/payment/cb.jpeg';
import kbzpay from '@/public/payment/kbz.png';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedPayment = searchParams.get('payment');
  const { cartItems, getCartTotal, clearCart } = useShoppingCart();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed'>(
    'pending'
  );
  console.log(paymentStatus);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Generate a mock order ID
      const mockOrderId = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      clearCart(); // Clear the cart
      router.push(`/checkout/confirmation/${mockOrderId}`);
    }, 1500);
  };

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id)!,
  }));

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-3xl font-playfair-display text-dark-brown mb-8'>
          Checkout
        </h1>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Shipping Information Form */}
          <div className='space-y-6'>
            <div className='bg-white p-6 rounded-lg border border-border-brown'>
              <h2 className='text-xl font-playfair-display text-dark-brown mb-4'>
                Shipping Information
              </h2>
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='fullName'
                    className='text-sm font-medium text-gray-700'
                  >
                    Full Name
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='email'
                    className='text-sm font-medium text-gray-700'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='address'
                    className='text-sm font-medium text-gray-700'
                  >
                    Address
                  </label>
                  <Textarea
                    id='address'
                    name='address'
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className='w-full border-gray-300 focus:ring-2 focus:ring-dark-brown'
                    rows={3}
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='city'
                      className='text-sm font-medium text-gray-700'
                    >
                      City
                    </label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown'
                    />
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='postalCode'
                      className='text-sm font-medium text-gray-700'
                    >
                      Postal Code
                    </label>
                    <input
                      type='text'
                      id='postalCode'
                      name='postalCode'
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown'
                    />
                  </div>
                </div>

                {/* <div className='space-y-2'>
                  <label
                    htmlFor='country'
                    className='text-sm font-medium text-gray-700'
                  >
                    Country
                  </label>
                  <input
                    type='text'
                    id='country'
                    name='country'
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown'
                  />
                </div> */}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className='space-y-6'>
            <div className='bg-white p-6 rounded-lg border border-border-brown'>
              <h2 className='text-xl font-playfair-display text-dark-brown mb-4'>
                Order Summary
              </h2>
              <div className='space-y-4'>
                {cartProducts.map((item) => (
                  <div key={item.id} className='flex justify-between text-sm'>
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>
                      ${(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className='border-t border-gray-200 pt-4 mt-4'>
                  <div className='flex justify-between font-medium'>
                    <span>Subtotal</span>
                    <span>${getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className='flex justify-between text-sm text-gray-600 mt-2'>
                    <span>Payment Method</span>
                    <span className='capitalize'>
                      {selectedPayment?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className='text-xl font-playfair-display text-dark-brown mb-4'>
              Payment Method
            </h2>

            <div className='flex flex-wrap gap-4'>
              {/* KBZ Pay */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Image
                    src={kbzpay}
                    alt='KBZ Pay'
                    width={80}
                    height={80}
                    className='w-14 border hover:cursor-pointer hover:bg-gray-200 border-border-brown h-auto rounded-lg'
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader className='flex flex-row justify-between items-center'>
                    <AlertDialogTitle>KBZ Pay QR Code</AlertDialogTitle>
                    <AlertDialogCancel className='p-2 border hover:bg-gray-200 border-gray-50'>
                      <X className='h-5 w-5' />
                    </AlertDialogCancel>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    <div className='bg-white rounded-lg border border-gray-100  p-4'>
                      <Image
                        src='/scan/kbz.jpg'
                        alt='KBZ Pay QR Code'
                        width={300}
                        height={300}
                        className='w-full rounded-lg'
                      />
                      <p className='mt-4 text-sm text-gray-600 text-center'>
                        Scan this QR code with KBZ Pay to complete the payment
                      </p>
                    </div>
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => {
                        setPaymentStatus('completed');
                        handleSubmit({
                          preventDefault: () => {},
                        } as React.FormEvent);
                      }}
                    >
                      I&apos;ve Completed the Payment
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* CB Pay */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Image
                    src={cbpay}
                    alt='CB Pay'
                    width={80}
                    height={80}
                    className='w-14 border hover:cursor-pointer hover:bg-gray-200 border-border-brown h-auto rounded-lg'
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className='max-w-md'>
                  <AlertDialogHeader className='flex flex-row justify-between items-center'>
                    <AlertDialogTitle>CB Pay QR Code</AlertDialogTitle>
                    <AlertDialogCancel className='p-2 border hover:bg-gray-200 border-gray-50'>
                      <X className='h-5 w-5' />
                    </AlertDialogCancel>
                  </AlertDialogHeader>
                  <AlertDialogDescription className='w-[80%'>
                    <div className='bg-white  rounded-lg border border-border-brown p-4 '>
                      <Image
                        src='/scan/cb-copy.jpg'
                        alt='CB Pay QR Code'
                        width={300}
                        height={300}
                        className='rounded-lg w-full'
                      />
                      <p className='text-sm mt-4 text-gray-600 text-center'>
                        Scan this QR code with CB Pay to complete the payment
                      </p>
                    </div>
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => {
                        setPaymentStatus('completed');
                        handleSubmit({
                          preventDefault: () => {},
                        } as React.FormEvent);
                      }}
                    >
                      I&apos;ve Completed the Payment
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* AYA Pay */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Image
                    src={ayapay}
                    alt='AYA Pay'
                    width={80}
                    height={80}
                    className='w-14 border hover:cursor-pointer hover:bg-gray-200 border-border-brown h-auto rounded-lg'
                  />
                </AlertDialogTrigger>
                <AlertDialogContent className='max-w-md'>
                  <AlertDialogHeader className='flex flex-row justify-between items-center'>
                    <AlertDialogTitle>AYA Pay QR Code</AlertDialogTitle>
                    <AlertDialogCancel className='p-2 border hover:bg-gray-200 border-gray-50'>
                      <X className='h-5 w-5' />
                    </AlertDialogCancel>
                  </AlertDialogHeader>
                  <AlertDialogDescription>
                    <div className='bg-white rounded-lg border border-border-brown p-4'>
                      <Image
                        src='/scan/aya-copy.jpg'
                        alt='AYA Pay QR Code'
                        width={300}
                        height={300}
                        className='w-full rounded-lg'
                      />
                      <p className='mt-4 text-sm text-gray-600 text-center'>
                        Scan this QR code with AYA Pay to complete the payment
                      </p>
                    </div>
                  </AlertDialogDescription>
                  <AlertDialogFooter>
                    <AlertDialogAction
                      onClick={() => {
                        setPaymentStatus('completed');
                        handleSubmit({
                          preventDefault: () => {},
                        } as React.FormEvent);
                      }}
                    >
                      I&apos;ve Completed the Payment
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className='w-full bg-dark-brown hover:bg-dark-brown/90 text-white'
            >
              {isLoading ? (
                <div className='flex items-center justify-center'>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Processing...
                </div>
              ) : (
                'Complete Order'
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
