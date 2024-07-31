import { Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

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
  return (
    <div className="bg-red-100 dark:bg-red-800 p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <Card
        className="max-w-sm transition-transform transform hover:scale-105"
        imgAlt={`${product.subjectName} cover image`}
        imgSrc={product.image}
      >
        <a href="#">
          <h5 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product.subjectName}
          </h5>
        </a>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Board: {product.boardName}, Class: {product.className}, Score: {product.score}%
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">Rs {product.price}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <a
            href="#"
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Add to cart
          </a>

          <Link
            href={`/NotesPage/${product.slug}`}
            className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Read article
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;
