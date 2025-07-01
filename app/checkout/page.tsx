'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Lock, Info } from 'lucide-react';
import { products } from '@/app/lib/products';
import { Textarea } from '@/components/ui/textarea';
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

import { toast } from 'sonner';

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const router = useRouter();
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
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [cardErrors, setCardErrors] = useState<Record<string, string>>({});
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

  const validateCard = () => {
    const errors: Record<string, string> = {};

    if (!cardData.cardNumber.trim()) {
      errors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!cardData.cardholderName.trim()) {
      errors.cardholderName = 'Cardholder name is required';
    }

    if (!cardData.expiryDate.trim()) {
      errors.expiryDate = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(cardData.expiryDate)) {
      errors.expiryDate = 'Please enter expiry date in MM/YY format';
    }

    if (!cardData.cvv.trim()) {
      errors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      errors.cvv = 'Please enter a valid CVV';
    }

    setCardErrors(errors);
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

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim();
    }

    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    }

    setCardData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Clear error when user starts typing
    if (cardErrors[name]) {
      setCardErrors((prev) => ({
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

    if (!validateCard()) {
      toast.error('Card Validation Error', {
        description: 'Please fill in all card details correctly.',
      });
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success('Payment Processed Successfully', {
        description:
          'Your payment has been processed. Completing your order...',
      });

      // Generate a mock order ID and complete order
      setTimeout(() => {
        const mockOrderId = `ORD-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        clearCart(); // Clear the cart
        router.push(`/checkout/confirmation/${mockOrderId}`);
      }, 1000);
    }, 2000);
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
                    <span className='capitalize'>Credit/Debit Card</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg border border-border-brown'>
              {/* Payment Information Button */}
              <div className='bg-white mb-4 rounded-lg'>
                {cardData.cardNumber && (
                  <div className='bg-gray-100 p-4 rounded-md'>
                    <p className='text-sm text-gray-600 mb-2'>
                      Saved Payment Method:
                    </p>
                    <p className='text-sm font-medium'>
                      •••• •••• •••• {cardData.cardNumber.slice(-4)}
                    </p>
                    <p className='text-sm text-gray-600'>
                      Expires: {cardData.expiryDate}
                    </p>
                  </div>
                )}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant='outline'
                    className='border-dark-brown w-full text-dark-brown hover:bg-dark-brown hover:text-white'
                  >
                    <Info className='w-4 h-4 mr-2' />
                    Enter Your Payment Card Info
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className='max-w-md'>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl font-playfair-display text-dark-brown flex items-center gap-2'>
                      <CreditCard className='w-5 h-5' />
                      Payment Information
                    </AlertDialogTitle>
                    <AlertDialogDescription className='text-left'>
                      Please enter your payment details to complete your order.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <div className='space-y-4 mt-4'>
                    <div className='space-y-2'>
                      <label
                        htmlFor='dialogCardNumber'
                        className='text-sm font-medium text-gray-700'
                      >
                        Card Number <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        id='dialogCardNumber'
                        name='cardNumber'
                        required
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        placeholder='1234 5678 9012 3456'
                        maxLength={19}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                          cardErrors.cardNumber
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {cardErrors.cardNumber && (
                        <p className='text-sm text-red-500'>
                          {cardErrors.cardNumber}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <label
                        htmlFor='dialogCardholderName'
                        className='text-sm font-medium text-gray-700'
                      >
                        Cardholder Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type='text'
                        id='dialogCardholderName'
                        name='cardholderName'
                        required
                        value={cardData.cardholderName}
                        onChange={handleCardInputChange}
                        placeholder='John Doe'
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                          cardErrors.cardholderName
                            ? 'border-red-500'
                            : 'border-gray-300'
                        }`}
                      />
                      {cardErrors.cardholderName && (
                        <p className='text-sm text-red-500'>
                          {cardErrors.cardholderName}
                        </p>
                      )}
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-2'>
                        <label
                          htmlFor='dialogExpiryDate'
                          className='text-sm font-medium text-gray-700'
                        >
                          Expiry Date <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          id='dialogExpiryDate'
                          name='expiryDate'
                          required
                          value={cardData.expiryDate}
                          onChange={handleCardInputChange}
                          placeholder='MM/YY'
                          maxLength={5}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                            cardErrors.expiryDate
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {cardErrors.expiryDate && (
                          <p className='text-sm text-red-500'>
                            {cardErrors.expiryDate}
                          </p>
                        )}
                      </div>

                      <div className='space-y-2'>
                        <label
                          htmlFor='dialogCvv'
                          className='text-sm font-medium text-gray-700'
                        >
                          CVV <span className='text-red-500'>*</span>
                        </label>
                        <input
                          type='text'
                          id='dialogCvv'
                          name='cvv'
                          required
                          value={cardData.cvv}
                          onChange={handleCardInputChange}
                          placeholder='123'
                          maxLength={4}
                          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-dark-brown ${
                            cardErrors.cvv
                              ? 'border-red-500'
                              : 'border-gray-300'
                          }`}
                        />
                        {cardErrors.cvv && (
                          <p className='text-sm text-red-500'>
                            {cardErrors.cvv}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='flex items-center gap-2 text-sm text-gray-600 mt-4'>
                      <Lock className='w-4 h-4' />
                      <span>
                        Your payment information is secure and encrypted
                      </span>
                    </div>
                  </div>

                  <AlertDialogFooter className='mt-6'>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className='bg-dark-brown hover:bg-dark-brown/90 text-white'
                      onClick={() => {
                        if (validateCard()) {
                          toast.success(
                            'Payment information saved successfully!'
                          );
                        } else {
                          toast.error(
                            'Please fill in all card details correctly.'
                          );
                        }
                      }}
                    >
                      Save Payment Info
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className='w-full bg-dark-brown mt-4 hover:bg-dark-brown/90 text-white'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Processing Payment...
                  </div>
                ) : (
                  `Pay $${(
                    getCartTotal() - calculateDiscount()
                  ).toLocaleString()}`
                )}
              </Button>

              <p className='text-xs text-gray-500 text-center mt-3'>
                By completing your purchase, you agree to our Terms of Service
                and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
