"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productBookCard";
import { Button, Select } from "flowbite-react";

interface Product {
  _id: string;
  image: "";
  boardName: "";
  className: "";
  subjectName: "";
  price: "";
  edition: "";
  slug:"",
}

interface APIResponse {
  message: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [boardName, setBoardName] = useState('');
  const [className, setClassName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<APIResponse>("/api/getAllBook");
        console.log(res.data);
        setProducts(res.data.message);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e: any) => {
    if (e.target.id === "boardName") {
      setBoardName(e.target.value);
    }
    if (e.target.id === "className") {
      setClassName(e.target.value);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post<APIResponse>(`/api/getBook?className=${className}&boardName=${boardName}`);
      console.log(res.data);
      setProducts(res.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 sm:p-8">
      <div className="grid grid-flow-col gap-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-auto">
         
          <Select
            id="boardName"
            onChange={handleChange}
            value={boardName}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Select your board name</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
          </Select>
        </div>
        <div className="relative w-full sm:w-auto">
          <Select
            id="className"
            onChange={handleChange}
            value={className}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="">Select class</option>
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </div>
       
        <Button gradientDuoTone="purpleToPink" onClick={handleSubmit} className="self-end">
          Filter
        </Button>
      </div>

      <div className="flex flex-col gap-10 p-8 px-3 max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-10 py-7">
          {products && products.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
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
