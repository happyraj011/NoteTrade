'use client';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBook } from 'react-icons/fa';

interface FormData {
  email: string;
  password: string;
}

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value.trim(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage('All fields are required to fill');
    }

    try {
      setLoading(true);
      setErrorMessage('');

      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!data.success) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        router.push('/');
      }

    } catch (error: any) {
      setErrorMessage('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-3xl w-full p-6 md:flex md:items-center gap-6">
        {/* Left Section */}
        <div className="flex-1">
          <Link href="/" className="flex items-center space-x-4 group">
            <FaBook
              className="text-indigo-500 group-hover:text-pink-500 transition-colors duration-300"
              size={48} // Enlarged size
            />
            <span
              className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 
              bg-clip-text text-transparent group-hover:bg-gradient-to-r 
              group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-indigo-500 
              transition-all duration-300"
            >
              Note<span className="font-extrabold">Trade</span>
            </span>
          </Link>
          <p className="text-sm mt-5 text-gray-700 dark:text-gray-300">
            Sign up with your email and password to access NoteTrade.
          </p>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white dark:bg-gray-900 shadow-xl p-8 rounded-lg max-w-md w-full space-y-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="form-group">
              <Label className="text-sm text-gray-700 dark:text-gray-300" value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
                value={formData.email}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <Label className="text-sm text-gray-700 dark:text-gray-300" value="Your Password" />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
                value={formData.password}
                className="input-field"
              />
            </div>

            <button
              className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 
              text-white font-medium shadow-lg hover:from-purple-500 hover:via-pink-500 hover:to-indigo-500 
              transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 
              focus:ring-purple-300 disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Spinner size="sm" color="white" />
                  <span>Loading...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span className="text-gray-600 dark:text-gray-400">Don't have an account?</span>
            <Link href="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>

          {errorMessage && (
            <Alert color="failure" className="transition-opacity duration-300 opacity-100 mt-5">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
