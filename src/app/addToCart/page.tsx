"use client";
import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

const CartPage: React.FC = () => {
  const { cart, subTotal, removeFromCart, clearCart } = useCart();
  const [cartItems, setCartItems] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    console.log(cart);  // Log cart data to ensure it is populated correctly
    setCartItems(cart); // Set the cart items in state
  }, [cart]);

  const paymentMethod = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/payment', { subTotal });
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
      <h1 className="text-4xl font-semibold text-center mb-8 text-gray-900">Your Cart</h1>
      {Object.keys(cartItems).length === 0 ? (
        <p className="text-center text-xl text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-8">
          {Object.keys(cartItems).map((itemCode) => {
            const item = cartItems[itemCode];
            const articleLink = item.type === 'book' ? `/bookPage/${item.itemCode}` : `/NotesPage/${item.itemCode}`;
            return (
              <Card key={itemCode} className="bg-white p-6 rounded-lg shadow-xl border border-gray-300">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                  <div className="flex-shrink-0 w-full md:w-1/4">
                    <Image
                      src={item.image}
                      alt={`${item.subjectName} cover image`}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-medium text-gray-900">{item.subjectName}</h2>
                    <p className="text-gray-600">Board: {item.boardName}, Class: {item.className}, Type: {item.type}</p>
                    <p className="text-xl font-semibold text-gray-900">Price: Rs {item.price}</p>
                    <p className="text-lg text-gray-600">Quantity: {item.qty}</p>
                    <div className="flex space-x-4 mt-4">
                      <Button
                        color="red"
                        onClick={() => removeFromCart(itemCode, 1)}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                      >
                        Remove 1
                      </Button>
                      <Button
                        color="gray"
                        onClick={() => removeFromCart(itemCode, item.qty)}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white"
                      >
                        Remove All
                      </Button>
                    </div>
                    <Link
                      href={articleLink}
                      className="mt-4 inline-block bg-gray-300 text-gray-900 text-sm font-medium rounded-md px-6 py-3 hover:bg-gray-400"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
          <div className="text-right mt-6 space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900">Subtotal: Rs {subTotal}</h2>
            <div className="flex justify-end space-x-4 mt-6">
              <Button
                color="red"
                onClick={clearCart}
                className="px-6 py-3 text-lg bg-red-600 hover:bg-red-700 transition-colors duration-300"
              >
                Clear Cart
              </Button>
              <Button
                color="blue"
                onClick={paymentMethod}
                className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
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
