"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productNotesCard";
import { Button, Select } from "flowbite-react";

interface Product {
  _id: string;
  image: string;
  boardName: string;
  className: string;
  subjectName: string;
  price: string;
  score: string;
  slug: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [boardName, setBoardName] = useState<string>('');
  const [className, setClassName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch initial products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/getAllNotes");
        setProducts(res.data.message || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle filter submission
  const handleSubmit = async () => {
    if (!boardName || !className) return;
    
    setIsLoading(true);
    
    try {
      const res = await axios.post(`/api/getBook?className=${className}&boardName=${boardName}`);
      setProducts(res.data.message || []);
    } catch (error) {
      console.error("Filter failed:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-blue-50 via-gray-100 to-gray-200 p-8 sm:p-8">
      {/* Filter Section */}
      <div className="w-full sm:w-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          {/* Board Name Select */}
          <Select
            id="boardName"
            onChange={(e) => setBoardName(e.target.value)}
            value={boardName}
            className="w-full sm:w-1/2"
          >
            <option value="">Select your board name</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
          </Select>

          {/* Class Name Select */}
          <Select
            id="className"
            onChange={(e) => setClassName(e.target.value)}
            value={className}
            className="w-full sm:w-1/2"
          >
            <option value="">Select class</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>

          <Button
            gradientDuoTone="purpleToPink"
            onClick={handleSubmit}
            disabled={!boardName || !className}
          >
            Filter
          </Button>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="w-full max-w-6xl">
        {isLoading ? (
          <div className="text-center py-10">
            <p>Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg font-semibold text-gray-700 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 border border-gray-400 rounded-2xl p-6 shadow-lg animate-pulse">
          No products available. Please try a different filter.
        </p>
        )}
      </div>
    </main>
  );
}