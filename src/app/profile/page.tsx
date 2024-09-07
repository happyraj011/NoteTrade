'use client';
import axios from 'axios';
import { TextInput, Button, Card } from 'flowbite-react';
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

 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setLoading(true);
    
    try {
      const res = await axios.put('/api/updateUser', formData);
      console.log('Updated successfully', res.data);
    } catch (error: any) {
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
        console.log(error.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-4 w-full">
      <h1 className="my-7 text-center font-bold text-4xl text-gray-800">Profile</h1>
      <Card className="shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {formData ? (
            <>
              <TextInput
                type="text"
                id="username"
                placeholder="Username"
                value={formData.username}
                required={true}
                shadow={true}
                sizing="lg"
                onChange={handleChange}
              />
              <TextInput
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                required={true}
                shadow={true}
                sizing="lg"
                onChange={handleChange}
              />
              <TextInput
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password || ''}
                required={true}
                shadow={true}
                sizing="lg"
                onChange={handleChange}
              />
              <Button type="submit" className="w-full" gradientDuoTone="purpleToBlue" disabled={loading}>
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
