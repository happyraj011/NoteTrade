"use client"
import axios from 'axios';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface User {
  username: string;
  email: string;
}

export default function Header() {
  const [data, setData] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserDetails = async () => {
      const res = await axios.get("/api/user");
      setData(res.data.data);
    };
    
    getUserDetails();
  }, []);

  const logout=async()=>{
    try {
      await axios.get("api/logout");
      router.push('/login')
      setData(null)
    } catch (error:any) {
      console.log(error.message)
    }
}
  return (
    <Navbar className="border-b-2 py-4">
      <Link
        href="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Note
        </span>
        Trade
      </Link>

      <div className="flex gap-2 md:order-2 items-center">
        {data ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded />}
          >
            <Dropdown.Header>
              <span className="block text-sm">{data.username}</span>
              <span className="block text-sm font-medium truncate">
                {data.email}
              </span>
            </Dropdown.Header>
            <Link href="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>

      <Navbar.Collapse className="text-sm sm:text-base font-medium">
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/book">
          Book
        </Navbar.Link>
        <Navbar.Link as={Link} href="/notes">
          Notes
        </Navbar.Link>
        <Navbar.Link href="/about">
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}