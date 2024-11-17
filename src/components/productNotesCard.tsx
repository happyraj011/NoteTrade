import { useCart } from '@/context/CartContext';
import { Card } from 'flowbite-react';
import Link from 'next/link';
import React, { useState } from 'react';

interface ProductCardProps {
  product: {
    image: string;
    boardName: string;
    className: string;
    subjectName: string;
    price: string;
    score:string;
    slug:string
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product.slug, 1, parseFloat(product.price), product.boardName, product.className, product.subjectName,product.image,"Notes");
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000); 
  };


  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <Card
        className="max-w-sm transition-transform transform hover:scale-105"
        imgAlt={`${product.subjectName} cover image`} 
        imgSrc={product.image}
      >
        <h5 className="text-2xl font-semibold tracking-tight text-blue-600 dark:text-blue-500">
          {product.subjectName}
        </h5>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          <span className="font-bold">Board:</span> {product.boardName}, <span className="font-bold">Class:</span> {product.className}
        </p>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
          <span className="font-bold">Score:</span> {product.score}%
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Rs {product.price}
          </span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handleAddToCart}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 transition ease-in-out duration-300"
          >
            {isAdded ? 'Added to Cart' : 'Add to Cart'}
          </button>

          <Link
            href={`/NotesPage/${product.slug}`} 
            className="rounded-lg bg-gradient-to-r from-orange-400 to-red-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-l focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition ease-in-out duration-300"
          >
            Read Article
          </Link>
        </div>
      </Card>

      {isAdded && (
        <div className="mt-4 text-green-600 dark:text-green-400 text-sm text-center font-semibold">
          Item successfully added to your cart!
        </div>
      )}
    </div>
   
  );
};

export default ProductCard;
