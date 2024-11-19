'use client';

import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { FaBook } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.phoneNumber) {
      return setErrorMessage('All fields are required to fill');
    }
    try {
      setLoading(true);
      setErrorMessage('');
      const res = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        router.push('/login');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

<main className="flex flex-1 items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">

<div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto gap-6 p-6">
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
              <Label className="text-sm text-gray-700 dark:text-gray-300" value="Your Username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <Label className="text-sm text-gray-700 dark:text-gray-300" value="Your Email" />
              <TextInput
                type="email"
                placeholder="name@gmail.com"
                id="email"
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <Label className="text-sm text-gray-700 dark:text-gray-300" value="Your Phone Number" />
              <TextInput
                type="text"
                placeholder="+91"
                id="phoneNumber"
                onChange={handleChange}
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
                'Sign Up'
              )}
            </button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span className="text-gray-600 dark:text-gray-400">Have an account?</span>
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>

          {errorMessage && (
            <Alert color="failure" className="transition-opacity duration-300 opacity-100 mt-5">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </main>
    </div>
  );
}
