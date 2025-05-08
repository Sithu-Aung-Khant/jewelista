'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { products } from '@/lib/products';

interface CartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartContext {
  cartItems: CartItem[];
  addToCart: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const ShoppingCartContext = createContext<ShoppingCartContext | null>(null);

const CART_STORAGE_KEY = 'shoppingCart';

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

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (id: number, quantity: number) => {
    setCartItems((curr) => {
      const existing = curr.find((item) => item.id === id);
      if (existing) {
        return curr.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...curr, { id, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((curr) => curr.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((curr) =>
      curr.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, cartItem) => {
      const product = products.find((p) => p.id === cartItem.id);
      return total + (product?.price || 0) * cartItem.quantity;
    }, 0);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
