'use client';

import { products } from '@/app/lib/products';
import { Button } from '@/components/ui/button';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { motion } from 'framer-motion';
import { Trash2, Phone, Send } from 'lucide-react';
import Image from 'next/image';

export default function ShoppingCartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } =
    useShoppingCart();

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id)!,
  }));

  if (cartItems.length === 0) {
    return (
      <div className='container mx-auto px-4 py-16 text-center'>
        <h2 className='text-2xl font-playfair-display text-dark-brown mb-4'>
          Your Cart is Empty
        </h2>
        <p className='text-gray-600'>
          Start shopping to add items to your cart.
        </p>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8 max-w-7xl'>
      <h1 className='text-3xl font-playfair-display text-dark-brown mb-8'>
        Shopping Cart
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Left Column - Cart Items and Order Summary */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Cart Items */}
          <div className='space-y-4'>
            {cartProducts.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='flex gap-4 border border-border-brown p-4 rounded-lg'
              >
                <div className='relative w-24 h-24'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className='object-cover rounded'
                  />
                </div>

                <div className='flex-1'>
                  <h3 className='font-medium text-dark-brown'>
                    {product.name}
                  </h3>
                  <p className='text-sm text-gray-600'>{product.material}</p>
                  <p className='font-semibold text-dark-brown'>
                    {product.price.toLocaleString()} MMK
                  </p>

                  <div className='flex items-center gap-4 mt-2'>
                    <div className='flex items-center border border-gray-300 rounded'>
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className='px-2 py-1 border-r border-gray-300 hover:bg-gray-100'
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className='px-4 py-1'>{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className='px-2 py-1 border-l border-gray-300 hover:bg-gray-100'
                        disabled={quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className='text-red-500 hover:text-red-600'
                    >
                      <Trash2 className='w-5 h-5' />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary - Now below cart items */}
          <div className='border border-border-brown p-6 rounded-lg space-y-3'>
            <h2 className='text-xl font-playfair-display text-dark-brown'>
              Order Summary
            </h2>

            {/* Item Count */}
            <div className='flex justify-between text-sm text-gray-600'>
              <span>Items ({cartItems.length})</span>
              <span>
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{' '}
                items
              </span>
            </div>

            {/* Total */}
            <div className='border-t border-gray-200 pt-4'>
              <div className='flex justify-between text-lg font-semibold text-dark-brown'>
                <p>Total</p>
                <p>{getCartTotal() * 1.08} MMK</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Information */}
        <div className='lg:col-span-1'>
          <div className='border border-border-brown p-6 rounded-lg space-y-6'>
            <h2 className='text-xl font-playfair-display text-dark-brown'>
              Contact Information
            </h2>

            <p className='text-sm text-gray-600'>
              Contact us using the phone numbers below to place an order and
              complete the checkout process.
            </p>
            <p className='text-xs text-amber-800 bg-amber-50 border border-amber-200 p-3 rounded-lg font-medium'>
              Please note that the numbers below are the only official contact
              methods. Any other numbers you may encounter are not legitimate
              and should not be trusted.
            </p>

            {/* Contact Methods */}
            <div className='space-y-4'>
              {/* Phone */}
              <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                <Phone className='w-5 h-5 text-dark-brown' />
                <div>
                  <p className='font-medium text-dark-brown'>Phone</p>
                  <p className='text-sm text-gray-600'>+95 995 540 2838</p>
                </div>
              </div>

              {/* Telegram */}
              <button
                onClick={() => window.open('https://t.me/urinzali', '_blank')}
                className='flex items-center w-full gap-3 p-3 bg-gray-50 rounded-lg'
              >
                <Send className='w-5 h-5 text-blue-500' />
                <div>
                  <p className='font-medium text-dark-brown'>Telegram</p>
                  <p className='text-sm text-gray-600'>@urinzali</p>
                </div>
              </button>

              {/* Messenger */}
              {/* <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                <MessageCircle className='w-5 h-5 text-blue-600' />
                <div>
                  <p className='font-medium text-dark-brown'>Messenger</p>
                  <p className='text-sm text-gray-600'>@your_page_name</p>
                </div>
              </div> */}
            </div>

            {/* Business Hours */}
            <div className='border-t border-gray-200 pt-4'>
              <h3 className='font-medium text-dark-brown mb-2'>
                Business Hours
              </h3>
              <div className='space-y-1 text-sm text-gray-600'>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className='space-y-3'>
              <Button
                onClick={() => window.open('https://t.me/urinzali', '_blank')}
                className='w-full text-white'
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
