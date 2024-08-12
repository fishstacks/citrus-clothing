"use client";

import { Product } from '@prisma/client';
import { useState, createContext, useContext, ReactNode } from 'react';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeCartItem: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id)
        if (existingItemIndex > -1) {
          const updatedItems = [...prevItems];
          const updatedItem = { ...updatedItems[existingItemIndex], quantity: updatedItems[existingItemIndex].quantity + 1 };
          updatedItems[existingItemIndex] = updatedItem;
          return updatedItems;
        }
        else
        { return [...prevItems, { ...product, quantity: 1 }];}
      });
  };

  const removeCartItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  /*const  removeCartItem: (id) => set((state) => ({
      items: state.items.filter(
        (item) => item.product.id !== id
      ),
    }))*/

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeCartItem}}>
      {children}
    </CartContext.Provider>
  );
};

export default function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
