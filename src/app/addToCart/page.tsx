"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import axios from 'axios';

const CartPage: React.FC = () => {
  const { cart, subTotal, removeFromCart, clearCart } = useCart();
  const [cartItems, setCartItems] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const paymentMethod = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/payment',{subTotal});
      const approvalUrl = res.data.approvalUrl;
      if (approvalUrl) {
        window.location.href = approvalUrl;
      } else {
        console.error('No approval URL returned');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
    <h1 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Your Cart</h1>
    {Object.keys(cartItems).length === 0 ? (
      <p className="text-center text-xl text-gray-600 dark:text-gray-300">Your cart is empty.</p>
    ) : (
      <div className="space-y-6">
        {Object.keys(cartItems).map((itemCode) => {
          const item = cartItems[itemCode];
          const articleLink = item.type === 'book' ? `/bookPage/${item.itemCode}` : `/NotesPage/${item.itemCode}`;
          return (
            <Card key={itemCode} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 w-full md:w-1/4">
                  <img
                    src={item.image}
                    alt={`${item.subjectName} cover image`}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{item.subjectName}</h2>
                  <p className="text-gray-600 dark:text-gray-400">Board: {item.boardName}, Class: {item.className}, Type: {item.type}</p>
                  <p className="text-gray-900 dark:text-white">Price: Rs {item.price}</p>
                  <p className="text-gray-900 dark:text-white">Quantity: {item.qty}</p>
                  <div className="flex space-x-2 mt-4">
                    <Button
                      color="red"
                      onClick={() => removeFromCart(itemCode, 1)}
                      className="flex-1 bg-red-100"
                    >
                      Remove 1
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => removeFromCart(itemCode, item.qty)}
                      className="flex-1 bg-gray-100"
                    >
                      Remove All
                    </Button>
                  </div>
                  <Link
                    href={articleLink}
                    className="rounded-lg bg-blue-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-800 dark:focus:ring-blue-500 transition mt-4 block"
                  >
                    Read Article
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}
        <div className="text-right mt-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Subtotal: Rs {subTotal}</h2>
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              color="red"
              onClick={clearCart}
              className="px-6 py-3 text-lg bg-red-500 hover:bg-red-600 transition-colors duration-300"
            >
              Clear Cart
            </Button>
            <Button
              color="blue"
              onClick={paymentMethod}
              className="px-6 py-3 text-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default CartPage;
