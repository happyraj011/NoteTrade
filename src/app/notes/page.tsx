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
  const [boardName, setBoardName] = useState<string>('');
  const [className, setClassName] = useState<string>('');

  // Fetching the products initially when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<APIResponse>("/api/getAllBook");
        setProducts(res.data.message);
      } catch (error: any) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);

  // Handling changes in the select input
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    if (id === "boardName") setBoardName(value);
    if (id === "className") setClassName(value);
  };

  // Fetching products based on the selected filters
  const handleSubmit = async () => {
    if (!boardName || !className) return; // Prevent API call if no filter is selected

    try {
      const res = await axios.post<APIResponse>(`/api/getBook?className=${className}&boardName=${boardName}`);
      setProducts(res.data.message);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-blue-50 via-gray-100 to-gray-200 p-8 sm:p-8">
      {/* Filter Section */}
      <div className="w-full sm:w-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {/* Board Name Select */}
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

          {/* Class Name Select */}
          <div className="relative w-full sm:w-1/2">
            <Select
              id="className"
              onChange={handleChange}
              value={className}
              className="block w-full p-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 ease-in-out hover:border-indigo-500"
            >
              <option value="">Select class</option>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </Select>
          </div>

          {/* Filter Button */}
          <Button
            gradientDuoTone="purpleToPink"
            onClick={handleSubmit}
            className="self-center w-full sm:w-auto text-white font-semibold shadow-md hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-800 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!boardName || !className} // Disable button if no selection is made
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Product Cards Section */}
      <div className="flex flex-col gap-10 p-8 px-3 max-w-6xl mx-auto">
        <div className="max-w-6xl mx-auto p-3 flex flex-col gap-10 py-7">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg text-gray-500">No products available</p>
          )}
        </div>
      </div>
    </main>
  );
}
