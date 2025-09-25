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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [usesServerCart, setUsesServerCart] = useState<boolean>(false);

  // Hydrate from server cart if logged in, otherwise from localStorage
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch('/api/cart', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data?.items) ? data.items : [];
          // items: [{ product_id: string, quantity: number }]
          const mapped: CartItem[] = items
            .map((it: { product_id: string; quantity: number }) => ({
              id: Number.parseInt(it.product_id, 10),
              quantity: it.quantity,
            }))
            .filter(
              (it: CartItem) => Number.isFinite(it.id) && it.quantity > 0
            );
          if (isMounted) {
            setUsesServerCart(true);
            setCartItems(mapped);
          }
        } else {
          // Fall back to local for unauthenticated users
          const stored =
            typeof window !== 'undefined'
              ? localStorage.getItem(CART_STORAGE_KEY)
              : null;
          const local = stored ? (JSON.parse(stored) as CartItem[]) : [];
          if (isMounted) {
            setUsesServerCart(false);
            setCartItems(local);
          }
        }
      } catch {
        const stored =
          typeof window !== 'undefined'
            ? localStorage.getItem(CART_STORAGE_KEY)
            : null;
        const local = stored ? (JSON.parse(stored) as CartItem[]) : [];
        if (isMounted) {
          setUsesServerCart(false);
          setCartItems(local);
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Persist to localStorage only when not using server cart
  useEffect(() => {
    if (!usesServerCart && typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, usesServerCart]);

  const addToCart = async (productId: number, quantity: number) => {
    // Optimistic update
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === productId);
      if (existing) {
        return prev.map((i) =>
          i.id === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { id: productId, quantity }];
    });

    if (usesServerCart) {
      try {
        const res = await fetch('/api/cart/item', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: String(productId), quantity }),
        });
        if (!res.ok) throw new Error('Failed');
      } catch {
        // Revert on failure
        setCartItems((prev) => {
          const after = prev.map((i) =>
            i.id === productId ? { ...i, quantity: i.quantity - quantity } : i
          );
          return after.filter((i) => i.quantity > 0);
        });
      }
    }
  };

  const removeFromCart = async (productId: number) => {
    const prevSnapshot = cartItems;
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
    if (usesServerCart) {
      try {
        const res = await fetch('/api/cart/item', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: String(productId) }),
        });
        if (!res.ok) throw new Error('Failed');
      } catch {
        setCartItems(prevSnapshot);
      }
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }
    const prevSnapshot = cartItems;
    setCartItems((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
    if (usesServerCart) {
      try {
        const res = await fetch('/api/cart/item', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId: String(productId), quantity }),
        });
        if (!res.ok) throw new Error('Failed');
      } catch {
        setCartItems(prevSnapshot);
      }
    }
  };

  const clearCart = async () => {
    const prevSnapshot = cartItems;
    setCartItems([]);
    if (usesServerCart) {
      try {
        const res = await fetch('/api/cart', { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed');
      } catch {
        setCartItems(prevSnapshot);
      }
    }
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
