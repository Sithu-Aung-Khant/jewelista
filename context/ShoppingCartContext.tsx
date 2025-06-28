'use client';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { products } from '@/app/lib/products';

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

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize from localStorage on mount
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems]);

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
      return newItems;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      return newItems;
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) => {
      const newItems = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      return newItems;
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
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

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider'
    );
  }
  return context;
};
