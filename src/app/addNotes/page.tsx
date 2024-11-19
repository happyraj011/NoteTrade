"use client";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "@/firebase.js";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import ReactQuill and Image with { ssr: false }
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import "react-quill/dist/quill.snow.css";
const ImageNoSSR = dynamic(() => import("next/image"), { ssr: false });

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [certificate, setCertificate] = useState<File | null>(null);
  const [imageUploadProgress, setImageUploadProgress] = useState<number | null>(null);
  const [certificateUploadProgress, setCertificateUploadProgress] = useState<number | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | number | null>(null);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [publishError, setPublishError] = useState<string | null>(null);

  const router = useRouter();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
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
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleUploadCertificate = async () => {
    try {
      if (!certificate) {
        setImageUploadError("Please select an image for certificate");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + certificate.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, certificate);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setCertificateUploadProgress(Number(progress.toFixed(0)));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setCertificateUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setCertificateUploadProgress(null);
            setFormData({ ...formData, certificate: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setCertificateUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/addNotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      }
      if (res.ok) {
        setPublishError(null);
        router.push("/");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Add Notes</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Subject Name"
            required
            id="subjectName"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, subjectName: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, boardName: e.target.value })
            }
          >
            <option value="uncategorised">Select your board name</option>
            <option value="CBSE">CBSE</option>
            <option value="ICSE">ICSE</option>
            <option value="State Board">State Board</option>
          </Select>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Price"
            required
            id="price"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, className: e.target.value })
            }
          >
            <option value="uncategorised">Select class</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Score"
            required
            id="score"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, score: e.target.value })
            }
          />
        </div>

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
            onClick={handleUploadImage}
            disabled={imageUploadProgress !== null}
          >
            {imageUploadProgress !== null ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.image && (
          <ImageNoSSR
            src={formData.image}
            alt="upload"
            className="w-full h-72 object-cover"
          />
        )}

        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            multiple
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setCertificate(e.target.files[0]);
              }
            }}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
            onClick={handleUploadCertificate}
            disabled={certificateUploadProgress !== null}
          >
            {certificateUploadProgress !== null ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={certificateUploadProgress}
                  text={`${certificateUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload certificate"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.certificate && (
          <ImageNoSSR
            src={formData.certificate}
            alt="certificate"
            className="w-full h-72 object-cover"
          />
        )}

        <div className="flex flex-col gap-4">
        <ReactQuill
          theme="snow"
          placeholder="Write something...."
          className="h-72 mb-12"
          onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
        />
        </div>

        {publishError && <Alert color="failure">{publishError}</Alert>}
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          className="px-6 py-3 mt-5"
        >
          Publish Notes
        </Button>
      </form>
    </div>
  );
}
