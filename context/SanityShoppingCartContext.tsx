'use client';

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { client } from '@/app/sanity/client';

interface CartItem {
  id: string;
  quantity: number;
}

interface ShoppingCartContext {
  cartItems: CartItem[];
  addToCart: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => Promise<number>;
}

const SanityShoppingCartContext = createContext<ShoppingCartContext | null>(
  null
);

const CART_STORAGE_KEY = 'sanityShopping Cart';

export function SanityShoppingCartProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  const addToCart = (productId: string, quantity: number) => {
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

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const newItems = prevItems.filter((item) => item.id !== productId);
      return newItems;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
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

  const getCartTotal = async () => {
    // Fetch all product prices from Sanity in one query
    const productIds = cartItems.map((item) => item.id);
    const products = await client.fetch(
      `*[_type == "product" && _id in $ids]{
        _id,
        price
      }`,
      { ids: productIds }
    );

    interface SanityProduct {
      _id: string;
      price: number;
    }

    return cartItems.reduce((total, item) => {
      const product = products.find((p: SanityProduct) => p._id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  return (
    <SanityShoppingCartContext.Provider
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
    </SanityShoppingCartContext.Provider>
  );
}

export const useSanityShoppingCart = () => {
  const context = useContext(SanityShoppingCartContext);
  if (!context) {
    throw new Error(
      'useSanityShoppingCart must be used within a SanityShoppingCartProvider'
    );
  }
  return context;
};
