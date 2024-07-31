"use client"
import axios from 'axios';
import { Button } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';


import React, { useEffect, useState } from 'react';

interface Notes {
  
  image: string;
  boardName: string;
  className: string;
  subjectName: string;
  price: string;
  score:string;
  createdAt: string;
  content: string;
  slug: string;
}

const NotesPage = ({params}:any) => {
  const [notes, setNotes] = useState<Notes | null>(null);
  const slug=params.slug

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

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen bg-gray-50'>
      <Link
        href={`/search?category=${notes.subjectName}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size='xs'>
          {notes.subjectName}
        </Button>
      </Link>
      <img
        src={notes.image}
        className='mt-10 p-3 max-h-[600px] w-full object-cover rounded-lg shadow-md'
      />
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{new Date(notes.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {Math.ceil(notes.content.length / 1000)} mins read
        </span>
      </div>
      <div className='flex flex-col p-3 max-w-2xl mx-auto w-full bg-white rounded-lg shadow-md'>
        <p><strong>Board:</strong> {notes.boardName}</p>
        <p><strong>Class:</strong> {notes.className}</p>
        <p><strong>Price:</strong> Rs {notes.price}</p>
        <p><strong>Edition:</strong> {notes.score}</p>
        <div
          className='mt-4'
          dangerouslySetInnerHTML={{ __html: notes.content }}
        ></div>
      </div>
    </main>
  );
};

export default NotesPage;
