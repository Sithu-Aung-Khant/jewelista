import { useState } from 'react';

const CART_STORAGE_KEY = 'cart_items';
import { products } from '@/app/lib/products';

interface CartItem {
  id: number;
  quantity: number;
}

export const useShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const saveCartToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  };

  const addToCart = (productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);
      let newItems;
      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevItems, { id: productId, quantity }];
      }
      saveCartToLocalStorage(newItems);
      return newItems;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      saveCartToLocalStorage(newItems);
      return newItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      saveCartToLocalStorage(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    saveCartToLocalStorage([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
  };
};
