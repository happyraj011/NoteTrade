"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

interface CartItem {
  itemCode: string;
  qty: number;
  price: number;
  boardName: string;
  className: string;
  subjectName: string;
  image: string;
  type:string
}

interface CartContextType {
  cart: { [key: string]: CartItem };
  addToCart: (itemCode: string, qty: number, price: number, boardName: string, className: string, subjectName: string, image: string,type:string) => void;
  removeFromCart: (itemCode: string, qty: number) => void;
  clearCart: () => void;
  subTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<{ [key: string]: CartItem }>({});
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      calculateSubTotal(parsedCart);
    }
  }, []);

  const saveCart = (myCart: { [key: string]: CartItem }) => {
    localStorage.setItem('cart', JSON.stringify(myCart));
    calculateSubTotal(myCart);
  };

  const calculateSubTotal = (myCart: { [key: string]: CartItem }) => {
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
  };

  const addToCart = (itemCode: string, qty: number, price: number, boardName: string, className: string, subjectName: string, image: string,type:string) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty += qty;
    } else {
      newCart[itemCode] = { itemCode, qty, price, boardName, className, subjectName, image,type };
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const removeFromCart = (itemCode: string, qty: number) => {
    let newCart = { ...cart };
    if (itemCode in newCart) {
      newCart[itemCode].qty -= qty;
      if (newCart[itemCode].qty <= 0) {
        delete newCart[itemCode];
      }
      setCart(newCart);
      saveCart(newCart);
    }
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, subTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
