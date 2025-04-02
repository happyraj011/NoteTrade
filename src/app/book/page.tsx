"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productBookCard";
import { Button, Select } from "flowbite-react";

interface Product {
  _id: string;
  image: string;
  boardName: string;
  className: string;
  subjectName: string;
  price: string;
  edition: string;
  slug: string;
}

interface APIResponse {
  message: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [boardName, setBoardName] = useState('');
  const [className, setClassName] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get<APIResponse>("/api/getAllBook", {
        headers: { "Cache-Control": "no-store" }, // Ensure fresh data
      });
      setProducts(res.data.message || []);
    } catch (error: any) {
      console.log(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.id === "boardName") {
      setBoardName(e.target.value);
    }
    if (e.target.id === "className") {
      setClassName(e.target.value);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post<APIResponse>(
        `/api/getBook?className=${className}&boardName=${boardName}`
      );
      setProducts(res.data.message || []);
    } catch (error: any) {
      console.log(error.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-blue-50 via-gray-100 to-gray-200 p-8 sm:p-8">
      <div className="w-full sm:w-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="relative w-full sm:w-1/2">
            <Select
              id="boardName"
              onChange={handleChange}
              value={boardName}
              className="block w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out hover:border-indigo-500"
            >
              <option value="">Select your board name</option>
              <option value="CBSE">CBSE</option>
              <option value="ICSE">ICSE</option>
              <option value="State Board">State Board</option>
            </Select>
          </div>

          <div className="relative w-full sm:w-1/2">
            <Select
              id="className"
              onChange={handleChange}
              value={className}
              className="block w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out hover:border-indigo-500"
            >
              <option value="">Select class</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </div>

          <Button
            gradientDuoTone="purpleToPink"
            onClick={handleSubmit}
            disabled={loading}
            className="self-center w-full sm:w-auto text-white font-semibold shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 transition duration-300 ease-in-out"
          >
            {loading ? 'Filtering...' : 'Filter'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-10 p-8 px-3 max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-10 py-7">
          {loading ? (
            <div className="text-center">
              <p className="text-lg text-gray-500">Loading books...</p>
            </div>
          ) : products.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-lg font-semibold text-gray-700 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 border border-gray-400 rounded-2xl p-6 shadow-lg animate-pulse">
              No products available. Please try a different filter.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
