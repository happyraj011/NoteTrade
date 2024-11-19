// addBook.js or addBook.tsx
"use client"
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "@/firebase.js";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Image from 'next/image';

const Page = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | number | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [publishError, setPublishError] = useState<string | null>(null);

  const router = useRouter();

  const handleUploadImage = async () => {
    if (!file) {
      setImageUploadError("Please select an image");
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(Number(progress.toFixed(0)));
      }, 
      (error) => {
        setImageUploadError("Image upload failed");
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData(prev => ({ ...prev, image: downloadURL }));
          setImageUploadProgress(null);
        });
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/addBook', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      } else {
        setPublishError(null);
        router.push('/');
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Add a Book</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Subject Name"
            required
            onChange={(e) => setFormData(prev => ({ ...prev, subjectName: e.target.value }))}
          />
          <Select onChange={(e) => setFormData(prev => ({ ...prev, boardName: e.target.value }))}>
            <option value="uncategorised">Select your board name</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
          </Select>
        </div>

        {/* Other inputs for price, score, and class */}

        <Button
          type="button"
          gradientDuoTone="purpleToBlue"
          size="sm"
          onClick={handleUploadImage}
          disabled={imageUploadProgress !== null}
        >
          {imageUploadProgress !== null ? (
            <div className="w-16 h-16">
              <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`} />
            </div>
          ) : 'Upload Image'}
        </Button>

        {/* Handle form data submission, error, and image preview */}
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && <Image src={formData.image} alt="upload" width={500} height={500} />}
        
        <ReactQuill
          theme="snow"
          placeholder="Write something...."
          className="h-72 mb-12"
          onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Publish
        </Button>
        {publishError && <Alert color="failure">{publishError}</Alert>}
      </form>
    </div>
  );
};

export default Page;
