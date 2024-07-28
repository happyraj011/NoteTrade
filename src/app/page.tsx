'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";

interface Product {
  _id: string;
  image:"",
  className:"",
  subjectName:""
  price:"",
  edition:""
}

interface APIResponse {
  message: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<APIResponse>('/api/getAllBook');
        console.log(res.data);
        setProducts(res.data.message);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {products && products.length > 0 && (
            <div className='flex flex-col gap-6'>
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
