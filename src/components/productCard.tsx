import { Card } from 'flowbite-react';
import Link from 'next/link';
import React from 'react';

interface ProductCardProps {
  product: {
    image:"",
    className:"",
    subjectName:"",
    price:"",
    edition:"",
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card
      className="max-w-sm"
      imgAlt={`${product.subjectName} cover image`}
      imgSrc={product.image}
    >
      <a href="#">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          Class={product.className} , Subject={product.subjectName}
        </h5>
      </a>
    
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">Rs {product.price}</span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">Edition {product.edition}</span>
      </div>


      <div className="flex items-center justify-between">
      <a
          href="#"
          className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Add to cart
        </a>
        
        <a
          href="#"
          className="rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
         Read article
        </a>
      </div>
      
    </Card>
  );
};

export default ProductCard;
