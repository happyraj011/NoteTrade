'use client';
import axios from 'axios';
import { TextInput, Button, Card, Alert } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

interface User {
  username: string;
  email: string;
  password?: string;
}

export default function Page() {
  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);  // Reset error
    setSuccess(null); // Reset success message

    // Check if password is empty before sending to API
    const updatedData = { ...formData };
    if (updatedData.password === '') {
      delete updatedData.password; // Don't send empty password
    }

    try {
      const res = await axios.put('/api/updateUser', updatedData);
      setSuccess('Updated successfully!');
      console.log('Updated successfully', res.data);
    } catch (error: any) {
      setError(error.response ? error.response.data : error.message);
      console.error('Error updating user:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/user`);
        setFormData(res.data.data);
      } catch (error: any) {
        setError(error.message);
        console.log(error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 w-full bg-blue-50">
      <h1 className="my-6 text-center font-semibold text-3xl text-gray-800">Update Your Profile</h1>
      <Card className="shadow-md bg-white rounded-lg p-8">
        {error && <Alert color="failure">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {formData ? (
            <>
              <TextInput
                type="text"
                id="username"
                placeholder="Enter your username"
                value={formData.username}
                required
                shadow
                sizing="lg"
                onChange={handleChange}
                className="text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <TextInput
                type="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                required
                shadow
                sizing="lg"
                onChange={handleChange}
                className="text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <TextInput
                type="password"
                id="password"
                placeholder="Enter a new password"
                value={formData.password || ''}
                shadow
                sizing="lg"
                onChange={handleChange}
                className="text-gray-900 bg-gray-50 border-2 border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <Button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-200"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </>
          ) : (
            <p className="text-center text-gray-500">Loading...</p>
          )}
        </form>
      </Card>
    </div>
  );
}
