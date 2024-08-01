"use client";
import axios from 'axios';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Notes {
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

const NotesPage = ({ params }: any) => {
  const [notes, setNotes] = useState<Notes | null>(null);
  const slug = params.slug;

  useEffect(() => {
    if (slug) {
      const fetchNotes = async () => {
        try {
          const res = await axios.post(`/api/getNotes?slug=${slug}`);
          setNotes(res.data.message[0]);
        } catch (error: any) {
          console.log(error.message);
        }
      };
      fetchNotes();
    }
  }, [slug]);

  if (!notes) return <div>Loading...</div>;

  const handleDownloadCertificate = () => {
    const certificateUrl = notes.certificate;
    window.open(certificateUrl, '_blank');
  };

  return (
    <main className='p-6 flex flex-col max-w-4xl mx-auto min-h-screen bg-gray-50'>
      <div className="flex justify-between items-center mb-4">
        <Link href={`/search?category=${notes.subjectName}`} className="self-center mt-5">
          <Button color="gray" pill size="xs">
            {notes.subjectName}
          </Button>
        </Link>
      </div>

      <img
        src={notes.image}
        className='mt-5 p-3 max-h-[600px] w-full object-cover rounded-lg shadow-md'
      />

      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs mt-5'>
        <span>{new Date(notes.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {Math.ceil(notes.content.length / 1000)} mins read
        </span>
      </div>

      <section className="flex flex-col p-5 mt-4 max-w-2xl mx-auto w-full bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Notes Details</h3>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-orange-500 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Board:</strong> {notes.boardName}
            </p>
          </div>
          <div className="p-4 bg-indigo-500 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Class:</strong> {notes.className}
            </p>
          </div>
          <div className="p-4 bg-blue-400 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Price:</strong> Rs {notes.price}
            </p>
          </div>
          <div className="p-4 bg-red-500 rounded-lg shadow-inner text-white">
            <p className="text-lg font-semibold mb-2">
              <strong>Score:</strong> {notes.score}
            </p>
          </div>
        </div>

        <div className="mt-4 text-gray-700 leading-relaxed prose prose-lg">
          <h4 className="text-xl font-bold mb-2">About the Notes</h4>
          <div className="p-5 bg-gray-50 rounded-lg shadow-inner" dangerouslySetInnerHTML={{ __html: notes.content }}></div>
        </div>
      </section>

      <section className="flex flex-col p-5 mt-4 max-w-2xl mx-auto w-full bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-center">Certificate</h3>
        <p className="text-lg text-center mb-4">Download your certificate for completing these notes.</p>
        <Button color="blue" onClick={handleDownloadCertificate} className="self-center">
          Download Certificate
        </Button>
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

export default NotesPage;
