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
import { toast } from 'sonner';

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
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed'>(
    'pending'
  );
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [promoError, setPromoError] = useState('');

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.postalCode.trim()) {
      errors.postalCode = 'Postal code is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Form Validation Error', {
        description: 'Please fill in all required fields correctly.',
      });
      return;
    }

    if (paymentStatus !== 'completed') {
      toast.error('Payment Required', {
        description:
          'Please select a payment method and complete the payment before proceeding.',
      });
      return;
    }

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

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method);
    toast.info('Payment Method Selected', {
      description: `Please scan the QR code with ${method} to complete your payment.`,
    });
  };

  const handlePaymentComplete = () => {
    setPaymentStatus('completed');
    toast.success('Payment Completed', {
      description: 'You can now proceed to complete your order.',
    });
  };

  const calculateDiscount = () => {
    if (isPromoValid && promoCode === 'WELCOME10') {
      return getCartTotal() * 0.1; // 10% discount
    }
    return 0;
  };

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode === 'WELCOME10') {
      setIsPromoValid(true);
      setPromoError('');
      toast.success('Promo code applied successfully!');
    } else {
      setIsPromoValid(false);
      setPromoError('Invalid promo code');
      toast.error('Invalid promo code');
    }
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
                    Full Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    id='fullName'
                    name='fullName'
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                      formErrors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className='text-sm text-red-500'>
                      {formErrors.fullName}
                    </p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='email'
                    className='text-sm font-medium text-gray-700'
                  >
                    Email <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                      formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.email && (
                    <p className='text-sm text-red-500'>{formErrors.email}</p>
                  )}
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='address'
                    className='text-sm font-medium text-gray-700'
                  >
                    Address <span className='text-red-500'>*</span>
                  </label>
                  <Textarea
                    id='address'
                    name='address'
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full border focus:ring-2 focus:ring-dark-brown ${
                      formErrors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                    rows={3}
                  />
                  {formErrors.address && (
                    <p className='text-sm text-red-500'>{formErrors.address}</p>
                  )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <label
                      htmlFor='city'
                      className='text-sm font-medium text-gray-700'
                    >
                      City <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='city'
                      name='city'
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                        formErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {formErrors.city && (
                      <p className='text-sm text-red-500'>{formErrors.city}</p>
                    )}
                  </div>

                  <div className='space-y-2'>
                    <label
                      htmlFor='postalCode'
                      className='text-sm font-medium text-gray-700'
                    >
                      Postal Code <span className='text-red-500'>*</span>
                    </label>
                    <input
                      type='text'
                      id='postalCode'
                      name='postalCode'
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                        formErrors.postalCode
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {formErrors.postalCode && (
                      <p className='text-sm text-red-500'>
                        {formErrors.postalCode}
                      </p>
                    )}
                  </div>
                </div>

                {/* Add Promo Code Input */}
                <div className='mt-4'>
                  <form onSubmit={handlePromoSubmit}>
                    <div className='space-y-2'>
                      <label
                        htmlFor='promoCode'
                        className='text-sm font-medium text-gray-700'
                      >
                        Promo Code
                      </label>
                      <div className='flex gap-2'>
                        <input
                          type='text'
                          id='promoCode'
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder='Enter promo code'
                          className='flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown border-gray-300'
                        />
                        <Button
                          type='submit'
                          className='bg-dark-brown hover:bg-dark-brown/90 text-white'
                        >
                          Apply
                        </Button>
                      </div>
                      {promoError && (
                        <p className='text-sm text-red-500 mt-1'>
                          {promoError}
                        </p>
                      )}
                      {isPromoValid && (
                        <p className='text-sm text-green-600 mt-1'>
                          Promo code applied successfully!
                        </p>
                      )}
                    </div>
                  </form>
                </div>
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

                  {isPromoValid && (
                    <div className='flex justify-between text-sm text-green-600 mt-2'>
                      <span>Discount (10%)</span>
                      <span>-${calculateDiscount().toLocaleString()}</span>
                    </div>
                  )}

                  <div className='flex justify-between font-medium mt-2'>
                    <span>Total</span>
                    <span>
                      ${(getCartTotal() - calculateDiscount()).toLocaleString()}
                    </span>
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

            <div className='bg-white p-6 rounded-lg border border-border-brown'>
              <h2 className='text-xl font-playfair-display text-dark-brown mb-4'>
                Payment Method
              </h2>

              <div className='mb-4'>
                <p className='text-sm text-gray-600 mb-3'>
                  Select your payment method and scan the QR code to complete
                  the payment
                </p>
              </div>

              <div className='flex flex-wrap gap-4'>
                {/* KBZ Pay */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div
                      className={`cursor-pointer p-2 rounded-lg border ${
                        selectedPaymentMethod === 'KBZ Pay'
                          ? 'border-dark-brown bg-gray-50'
                          : 'border-border-brown hover:bg-gray-50'
                      }`}
                      onClick={() => handlePaymentMethodSelect('KBZ Pay')}
                    >
                      <Image
                        src={kbzpay}
                        alt='KBZ Pay'
                        width={80}
                        height={80}
                        className='w-12 h-auto rounded-lg'
                      />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader className='flex flex-row justify-between items-center'>
                      <AlertDialogTitle>KBZ Pay QR Code</AlertDialogTitle>
                      <AlertDialogCancel className='p-2 border hover:bg-gray-200 border-gray-50'>
                        <X className='h-5 w-5' />
                      </AlertDialogCancel>
                    </AlertDialogHeader>
                    <AlertDialogDescription>
                      <div className='bg-white rounded-lg border border-gray-100 p-4'>
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
                      <AlertDialogAction onClick={handlePaymentComplete}>
                        I&apos;ve Completed the Payment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* CB Pay */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div
                      className={`cursor-pointer p-2 rounded-lg border ${
                        selectedPaymentMethod === 'CB Pay'
                          ? 'border-dark-brown bg-gray-50'
                          : 'border-border-brown hover:bg-gray-50'
                      }`}
                      onClick={() => handlePaymentMethodSelect('CB Pay')}
                    >
                      <Image
                        src={cbpay}
                        alt='CB Pay'
                        width={80}
                        height={80}
                        className='w-12 h-auto rounded-lg'
                      />
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className='max-w-md'>
                    <AlertDialogHeader className='flex flex-row justify-between items-center'>
                      <AlertDialogTitle>CB Pay QR Code</AlertDialogTitle>
                      <AlertDialogCancel className='p-2 border hover:bg-gray-200 border-gray-50'>
                        <X className='h-5 w-5' />
                      </AlertDialogCancel>
                    </AlertDialogHeader>
                    <AlertDialogDescription className=''>
                      <div className='bg-white rounded-lg border border-border-brown p-4'>
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
                      <AlertDialogAction onClick={handlePaymentComplete}>
                        I&apos;ve Completed the Payment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                {/* AYA Pay */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div
                      className={`cursor-pointer p-2 rounded-lg border ${
                        selectedPaymentMethod === 'AYA Pay'
                          ? 'border-dark-brown bg-gray-50'
                          : 'border-border-brown hover:bg-gray-50'
                      }`}
                      onClick={() => handlePaymentMethodSelect('AYA Pay')}
                    >
                      <Image
                        src={ayapay}
                        alt='AYA Pay'
                        width={80}
                        height={80}
                        className='w-12 h-auto rounded-lg'
                      />
                    </div>
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
                      <AlertDialogAction onClick={handlePaymentComplete}>
                        I&apos;ve Completed the Payment
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className='mt-6'>
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || paymentStatus !== 'completed'}
                  className='w-full bg-dark-brown hover:bg-dark-brown/90 text-white'
                >
                  {isLoading ? (
                    <div className='flex items-center justify-center'>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Processing...
                    </div>
                  ) : paymentStatus !== 'completed' ? (
                    'Complete Payment First'
                  ) : (
                    'Complete Order'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
