'use client';

import { Button } from '@/components/ui/button';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { products } from '@/lib/products';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ShoppingCartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } =
    useShoppingCart();
  const router = useRouter();

  const cartProducts = cartItems.map((item) => ({
    ...item,
    product: products.find((p) => p.id === item.id)!,
  }));

  const handleCheckout = async () => {
    router.push('/checkout');
  };

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
        {/* Cart Items */}
        <div className='lg:col-span-2 space-y-4'>
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
                <h3 className='font-medium text-dark-brown'>{product.name}</h3>
                <p className='text-sm text-gray-600'>{product.material}</p>
                <p className='font-semibold text-dark-brown'>
                  ${product.price.toLocaleString()}
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
                    title='Remove from cart'
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

        {/* Order Summary */}
        <div className='lg:col-span-1'>
          <div className='border border-border-brown p-6 rounded-lg space-y-6'>
            <h2 className='text-xl font-playfair-display text-dark-brown'>
              Order Summary
            </h2>

            {/* Shipping Information */}
            <div className='space-y-3'>
              <h3 className='text-sm font-medium text-gray-700'>
                Shipping Information
              </h3>
              <div className='p-3 border rounded-lg'>
                <p className='text-sm text-gray-600'>
                  Estimated delivery: 3-5 business days
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  Free shipping on orders over $100
                </p>
              </div>
            </div>

            {/* Promotions Section */}
            <div className='space-y-3'>
              <h3 className='text-sm font-medium text-gray-700'>
                Available Promotions
              </h3>
              <div className='p-3 border rounded-lg'>
                <p className='text-sm text-gray-600'>
                  Use code &quot;WELCOME10&quot; for 10% off your first order
                </p>
              </div>
            </div>

            <div className='border-t border-gray-200 pt-4'>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Subtotal</p>
                <p>${getCartTotal().toLocaleString()}</p>
              </div>
              <p className='mt-0.5 text-sm text-gray-500'>
                Shipping and taxes calculated at checkout.
              </p>
            </div>

            <Button
              onClick={handleCheckout}
              className='w-full bg-dark-brown hover:bg-dark-brown/90 text-white'
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
