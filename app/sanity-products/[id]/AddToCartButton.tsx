'use client';

import { Button } from '@/components/ui/button';
import { useSanityShoppingCart } from '@/context/SanityShoppingCartContext';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface Product {
  _id: string;
  name: string;
  stock: number;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useSanityShoppingCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    try {
      addToCart(product._id, quantity);
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
    <div className='space-y-4'>
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
    </div>
  );
}
