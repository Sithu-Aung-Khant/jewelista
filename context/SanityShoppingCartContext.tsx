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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [usesServerCart, setUsesServerCart] = useState<boolean>(false);

  // Hydrate from server if logged in, else localStorage
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch('/api/cart', { method: 'GET' });
        if (res.ok) {
          const data = await res.json();
          const items = Array.isArray(data?.items) ? data.items : [];
          const mapped: CartItem[] = items
            .map((it: { product_id: string; quantity: number }) => ({
              id: it.product_id,
              quantity: it.quantity,
            }))
            .filter((it: CartItem) => !!it.id && it.quantity > 0);
          if (isMounted) {
            setUsesServerCart(true);
            setCartItems(mapped);
          }
        } else {
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

  // Persist to localStorage when not on server cart
  useEffect(() => {
    if (!usesServerCart && typeof window !== 'undefined') {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, usesServerCart]);

  const addToCart = async (productId: string, quantity: number) => {
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
          body: JSON.stringify({ productId, quantity }),
        });
        if (!res.ok) throw new Error('Failed');
      } catch {
        setCartItems((prev) => {
          const after = prev.map((i) =>
            i.id === productId ? { ...i, quantity: i.quantity - quantity } : i
          );
          return after.filter((i) => i.quantity > 0);
        });
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    const prevSnapshot = cartItems;
    setCartItems((prev) => prev.filter((i) => i.id !== productId));
    if (usesServerCart) {
      try {
        const res = await fetch('/api/cart/item', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        if (!res.ok) throw new Error('Failed');
      } catch {
        setCartItems(prevSnapshot);
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
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
          body: JSON.stringify({ productId, quantity }),
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
