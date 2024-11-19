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

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
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
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      router.push('/');
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen flex flex-col">
    
      <main className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto gap-6 p-6">
          {/* Branding Section */}
          <div className="text-center md:text-left space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <FaBook className="text-indigo-500" size={48} />
              <span className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 text-transparent bg-clip-text">
                NoteTrade
              </span>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Sign up with your email and password to access NoteTrade.
            </p>
          </div>

          {/* Login Form */}
          <div className="w-full max-w-md bg-white dark:bg-gray-900 shadow-lg p-6 rounded-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <Label htmlFor="email" value="Your Email" />
                <TextInput
                  type="email"
                  id="email"
                  placeholder="name@gmail.com"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2"
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password" value="Your Password" />
                <TextInput
                  type="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  className="mt-1 w-full border border-gray-300 dark:border-gray-700 rounded-md px-4 py-2"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-purple-500 hover:to-indigo-500 transition"
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

            {errorMessage && (
              <Alert color="failure" className="mt-4">
                {errorMessage}
              </Alert>
            )}

            <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
