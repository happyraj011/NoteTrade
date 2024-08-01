"use client";
import axios from "axios";
import { Badge, Button, Tooltip, Card } from "flowbite-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Book {
  image: string;
  boardName: string;
  className: string;
  subjectName: string;
  price: string;
  edition: string;
  createdAt: string;
  content: string;
  slug: string;
}

const BookPage = ({ params }: any) => {
  const [book, setBook] = useState<Book | null>(null);
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      const fetchBook = async () => {
        try {
          const res = await axios.post(`/api/getBook?slug=${slug}`);
          setBook(res.data.message[0]);
        } catch (error: any) {
          console.log(error.message);
        }
      };
      fetchBook();
    }
  }, [slug]);

  if (!book) return <div>Loading...</div>;

  return (
    <main className="p-6 flex flex-col max-w-4xl mx-auto min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <Link href={`/search?category=${book.subjectName}`} className="self-center mt-5">
          <Button color="gray" pill size="xs">
            {book.subjectName}
          </Button>
        </Link>
        <Badge color="success" size="sm">
          New
        </Badge>
      </div>

      <Card 
        imgSrc={book.image} 
        imgAlt={`${book.subjectName} cover`} 
        className="mt-5 p-3 max-h-[400px] w-full object-cover rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold text-center mt-4">{book.subjectName}</h2>
      </Card>

      <div className="flex justify-between p-3 border-b border-gray-300 mx-auto w-full max-w-2xl text-xs mt-5">
        <span>{new Date(book.createdAt).toLocaleDateString()}</span>
        <Tooltip content="Estimated reading time">
          <span className="italic">{Math.ceil(book.content.length / 1000)} mins read</span>
        </Tooltip>
      </div>

      <section className="flex flex-col p-5 mt-4 max-w-2xl mx-auto w-full bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Book Details</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-orange-500 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Board:</strong> {book.boardName}
            </p>
          </div>
          <div className="p-4 bg-indigo-500 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Class:</strong> {book.className}
            </p>
          </div>
          <div className="p-4 bg-blue-400 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Price:</strong> Rs {book.price}
            </p>
          </div>
          <div className="p-4 bg-red-500 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Edition:</strong> {book.edition}
            </p>
          </div>
        </div>

        <div className="mt-4 text-gray-700 leading-relaxed prose prose-lg">
          <h4 className="text-xl font-bold mb-2">About the Book</h4>
          <div className="p-5 bg-gray-200 font-semibold rounded-lg shadow-inner" dangerouslySetInnerHTML={{ __html: book.content }}></div>
        </div>
      </section>

      <div className="flex justify-between mt-5">
        <Button color="purple" pill>
          Add to Cart
        </Button>
        <Button color="green" pill>
          Buy Now
        </Button>
      </div>
    </main>
  );
};

export default BookPage;
