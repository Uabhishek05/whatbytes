"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Product, products } from "@/lib/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "whatbytes-cart";

type StoredCartItem = {
  id: string;
  quantity: number;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const rawCart = window.localStorage.getItem(STORAGE_KEY);
      if (!rawCart) {
        setIsReady(true);
        return;
      }

      const storedItems = JSON.parse(rawCart) as StoredCartItem[];
      const hydratedItems = storedItems
        .map((item) => {
          const product = products.find((candidate) => candidate.id === item.id);
          if (!product) return null;
          return {
            product,
            quantity: Math.max(1, item.quantity)
          };
        })
        .filter(Boolean) as CartItem[];

      setItems(hydratedItems);
    } catch {
      setItems([]);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const storedItems = items.map((item) => ({
      id: item.product.id,
      quantity: item.quantity
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedItems));
  }, [isReady, items]);

  const value = useMemo<CartContextValue>(() => {
    const addToCart = (product: Product, quantity = 1) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find((item) => item.product.id === product.id);
        if (existingItem) {
          return currentItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }

        return [...currentItems, { product, quantity }];
      });
    };

    const updateQuantity = (productId: string, quantity: number) => {
      setItems((currentItems) =>
        currentItems
          .map((item) =>
            item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
          .filter((item) => item.quantity > 0)
      );
    };

    const removeFromCart = (productId: string) => {
      setItems((currentItems) =>
        currentItems.filter((item) => item.product.id !== productId)
      );
    };

    const clearCart = () => setItems([]);

    return {
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      ),
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
