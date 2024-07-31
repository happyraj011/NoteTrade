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
      <div className="flex justify-between items-center">
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
        className="mt-10 p-3 max-h-[400px] w-full object-cover rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold text-center mt-4">{book.subjectName}</h2>
      </Card>

      <div className="flex justify-between p-3 border-b border-gray-300 mx-auto w-full max-w-2xl text-xs mt-5">
        <span>{new Date(book.createdAt).toLocaleDateString()}</span>
        <Tooltip content="Estimated reading time">
          <span className="italic">{Math.ceil(book.content.length / 1000)} mins read</span>
        </Tooltip>
      </div>

      <div className="flex flex-col p-5 mt-4 max-w-2xl mx-auto w-full bg-white rounded-lg shadow-lg">
        <div className="bg-indigo-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-lg font-semibold mb-2">
            <strong>Board:</strong> {book.boardName}
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-lg font-semibold mb-2">
            <strong>Class:</strong> {book.className}
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-lg font-semibold mb-2">
            <strong>Price:</strong> Rs {book.price}
          </p>
        </div>
        <div className="bg-indigo-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="text-lg font-semibold mb-2">
            <strong>Edition:</strong> {book.edition}
          </p>
        </div>
        <div className="mt-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: book.content }}></div>
      </div>

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
