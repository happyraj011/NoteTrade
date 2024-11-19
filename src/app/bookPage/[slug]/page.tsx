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

  if (!book) return <div className="text-center mt-20 text-lg text-purple-600">Loading your book...</div>;

  return (
    <main className="p-6 flex flex-col max-w-4xl mx-auto min-h-screen bg-gradient-to-r from-purple-50 via-orange-50 to-purple-100">
      <div className="flex justify-between items-center mb-6">
        <Link href={`/search?category=${book.subjectName}`}>
          <Button pill size="sm" className="text-sm bg-red-500
           hover:bg-red-500 text-white">
            📚 {book.subjectName}
          </Button>
        </Link>
        <Badge color="warning" size="sm" className="text-sm bg-orange-500 text-white">
          🆕 New
        </Badge>
      </div>

      <Card 
        imgSrc={book.image} 
        imgAlt={`${book.subjectName} cover`} 
        className="mt-5 p-3 w-full object-cover rounded-lg shadow-lg border border-gray-300 bg-white"
      >
        <h2 className="text-2xl font-extrabold text-center mt-4 text-purple-800">{book.subjectName}</h2>
      </Card>

      <div className="flex justify-between p-3 border-b border-gray-300 mx-auto w-full max-w-2xl text-sm mt-5 text-gray-600">
        <span>🗓 {new Date(book.createdAt).toLocaleDateString()}</span>
        <Tooltip content="Estimated reading time">
          <span className="italic">⏱ {Math.ceil(book.content.length / 1000)} mins read</span>
        </Tooltip>
      </div>

      <section className="flex flex-col p-6 mt-4 max-w-2xl mx-auto w-full bg-white rounded-xl shadow-lg border border-gray-300">
        <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">📖 Book Details</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-purple-100 rounded-lg shadow-inner text-gray-800">
            <p className="text-lg font-semibold">
              <strong>Board:</strong> {book.boardName}
            </p>
          </div>
          <div className="p-4 bg-orange-100 rounded-lg shadow-inner text-gray-800">
            <p className="text-lg font-semibold">
              <strong>Class:</strong> {book.className}
            </p>
          </div>
          <div className="p-4 bg-purple-200 rounded-lg shadow-inner text-gray-800">
            <p className="text-lg font-semibold">
              <strong>Price:</strong> ₹ {book.price}
            </p>
          </div>
          <div className="p-4 bg-orange-200 rounded-lg shadow-inner text-gray-800">
            <p className="text-lg font-semibold">
              <strong>Edition:</strong> {book.edition}
            </p>
          </div>
        </div>

        <div className="mt-4 text-gray-700 leading-relaxed">
          <h4 className="text-xl font-bold mb-2">📝 About the Book</h4>
          <div 
            className="p-5 bg-gray-100 rounded-lg shadow-inner text-gray-700" 
            dangerouslySetInnerHTML={{ __html: book.content }}
          ></div>
        </div>
      </section>

      
    </main>
  );
};

export default BookPage;
