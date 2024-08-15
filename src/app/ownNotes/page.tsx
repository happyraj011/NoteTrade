"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productNotesCard";
import { Button } from "flowbite-react";

interface Product {
  _id: string;
  image: "";
  boardName: "";
  className: "";
  subjectName: "";
  price: "";
  score:"";
  slug:"";
}

interface APIResponse {
  message: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<APIResponse>("/api/ownNotes");
        console.log(res.data);
        setProducts(res.data.message);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 sm:p-8">
      
      <div className="flex flex-col gap-10 p-8 px-3 max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-10 py-7">
          {products && products.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">No products available</p>
          )}
        </div>
      </div>
    </main>
  );
}
