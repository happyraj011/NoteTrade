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
  score: string;
  createdAt: string;
  content: string;
  slug: string;
  certificate: string;
}

interface BookPageProps {
  params: {
    slug: string;
  };
}

const BookPage: React.FC<BookPageProps> = ({ params }) => {
  const [notes, setNotes] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      const fetchBook = async () => {
        try {
          const res = await axios.post(`/api/getNotes?slug=${slug}`);
          setNotes(res.data.message[0]);
          setLoading(false);
        } catch (error: any) {
          console.log(error.message);
          setLoading(false);
        }
      };
      fetchBook();
    }
  }, [slug]);

  // Null check before rendering content
  if (!notes) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-purple-600">Loading your book...</div>
      </div>
    );
  }

  const handleDownloadCertificate = () => {
    const certificateUrl = notes.certificate;
    window.open(certificateUrl, '_blank');
  };

  return (
    <main className="p-6 flex flex-col max-w-4xl mx-auto min-h-screen bg-gradient-to-r from-blue-200 via-orange-200 to-purple-200">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <Link href={`/search?category=${notes.subjectName}`}>
          <Button
            pill
            size="sm"
            className="text-sm bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-lg hover:scale-105 transform transition-all duration-200"
          >
            📚 {notes.subjectName}
          </Button>
        </Link>
        <Badge
          color="warning"
          size="sm"
          className="text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg"
        >
          🆕 New
        </Badge>
      </div>

      {/* Book Card */}
      <Card
        imgSrc={notes.image}
        imgAlt={`${notes.subjectName} cover`}
        className="mt-5 p-3 w-full object-cover rounded-lg shadow-2xl border border-gray-300 bg-white hover:shadow-xl transform hover:scale-105 transition-all duration-300"
      >
        <h2 className="text-3xl font-extrabold text-center mt-4 text-blue-800">
          {notes.subjectName}
        </h2>
      </Card>

      {/* Book Metadata */}
      <div className="flex justify-between p-3 border-b border-gray-300 mx-auto w-full max-w-2xl text-sm mt-5 text-gray-600">
        <span>🗓 {new Date(notes.createdAt).toLocaleDateString()}</span>
        <Tooltip content="Estimated reading time">
          <span className="italic">⏱ {Math.ceil(notes.content.length / 1000)} mins read</span>
        </Tooltip>
      </div>

      {/* Book Details Section */}
      <section className="flex flex-col p-6 mt-4 max-w-2xl mx-auto w-full bg-white rounded-xl shadow-xl border border-gray-300">
        <h3 className="text-3xl font-extrabold mb-4 text-center text-blue-700">
          📖 Book Details
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-100 to-blue-300 rounded-lg shadow-inner text-blue-800 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <p className="text-lg font-semibold">
              <strong>Board:</strong> {notes.boardName}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-orange-100 to-orange-300 rounded-lg shadow-inner text-orange-800 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <p className="text-lg font-semibold">
              <strong>Class:</strong> {notes.className}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-100 to-purple-300 rounded-lg shadow-inner text-purple-800 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <p className="text-lg font-semibold">
              <strong>Price:</strong> ₹ {notes.price}
            </p>
          </div>
          <div className="p-4 bg-gradient-to-r from-pink-100 to-pink-300 rounded-lg shadow-inner text-pink-800 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            <p className="text-lg font-semibold">
              <strong>Score:</strong> {notes.score}%
            </p>
          </div>
        </div>

        <div className="mt-4 text-gray-700 leading-relaxed">
          <h4 className="text-2xl font-bold mb-2 text-blue-800">
            📝 About the Book
          </h4>
          <div
            className="p-5 bg-gray-100 rounded-lg shadow-inner text-gray-700"
            dangerouslySetInnerHTML={{
              __html: notes.content,
            }}
          ></div>
        </div>
      </section>

      <section className="flex flex-col p-5 mt-4 max-w-2xl mx-auto w-full bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Certificate</h3>
        <p className="text-lg text-center mb-4">Download your certificate for completing these notes.</p>
        <Button
          color="blue"
          onClick={handleDownloadCertificate}
          className="self-center bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 transform transition-all duration-200"
        >
          Download Certificate
        </Button>
      </section>
    </main>
  );
};

export default BookPage;
