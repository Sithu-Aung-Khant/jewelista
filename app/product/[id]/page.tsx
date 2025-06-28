'use client';

import { products } from '@/app/lib/products';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { ProductDetailsNavbar } from '@/components/global/ProductDetailsNavbar';
import { useShoppingCart } from '@/context/ShoppingCartContext';
import { toast } from 'sonner';

export default function ProductPage({ params }: { params: { id: string } }) {
  // const router = useRouter();
  const { addToCart } = useShoppingCart();
  const product = products.find((p) => p.id === parseInt(params.id));
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    notFound();
  }

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      addToCart(product.id, quantity);
      toast.success('Added to cart successfully!', {
        description: `${quantity} x ${product.name} added to your cart`,
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to add to cart', {
        description: 'Please try again',
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <>
      <ProductDetailsNavbar />
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='relative aspect-square w-full overflow-hidden rounded-lg'
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 50vw'
              priority
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='flex flex-col space-y-6'
          >
            <div>
              <h1 className='text-3xl font-playfair-display text-dark-brown mb-2'>
                {product.name}
              </h1>
              <p className='text-xl font-semibold text-dark-brown'>
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center space-x-2'>
                <span className='text-yellow-500'>★</span>
                <span className='text-sm text-gray-600'>{product.rating}</span>
              </div>
              <p className='text-gray-600'>{product.description}</p>
              <div className='space-y-2'>
                <p className='text-sm text-gray-600'>
                  Category:{' '}
                  <span className='font-medium'>{product.category}</span>
                </p>
                <p className='text-sm text-gray-600'>
                  Material:{' '}
                  <span className='font-medium'>{product.material}</span>
                </p>
                <p className='text-sm text-gray-600'>
                  Stock:{' '}
                  <span className='font-medium'>{product.stock} available</span>
                </p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className='flex items-center space-x-4'>
              <label className='text-sm text-gray-600'>Quantity:</label>
              <div className='flex items-center border border-gray-300 rounded'>
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className='px-3 py-1 border-r border-gray-300 hover:bg-gray-100 disabled:opacity-50'
                  disabled={quantity <= 1}
                  aria-label='Decrease quantity'
                >
                  -
                </button>
                <span className='px-4 py-1'>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className='px-3 py-1 border-l border-gray-300 hover:bg-gray-100 disabled:opacity-50'
                  disabled={quantity >= product.stock}
                  aria-label='Increase quantity'
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className='w-full bg-dark-brown hover:bg-dark-brown/90 text-white py-3 rounded-md flex items-center justify-center space-x-2 disabled:opacity-50'
            >
              <ShoppingCart className='w-5 h-5' />
              <span>
                {isAdding
                  ? 'Adding...'
                  : product.stock === 0
                  ? 'Out of Stock'
                  : 'Add to Cart'}
              </span>
            </Button>

            {/* Tags */}
            <div className='flex flex-wrap gap-2 pt-4'>
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className='px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
