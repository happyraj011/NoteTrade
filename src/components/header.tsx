"use client";
import axios from "axios";
import { Avatar, Button, Dropdown, Navbar, Spinner } from "flowbite-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";

interface User {
  username: string;
  email: string;
}

const UserDropdown = ({
  user,
  logout,
  router,
}: {
  user: User;
  logout: () => void;
  router: ReturnType<typeof useRouter>;
}) => (
  <Dropdown arrowIcon={false} inline label={<Avatar alt="user" rounded />}>
    <Dropdown.Header>
      <span className="block text-sm">{user.username}</span>
      <span className="block text-sm font-medium truncate">{user.email}</span>
    </Dropdown.Header>
    <Dropdown.Item onClick={() => router.push("/profile")}>Profile</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
  </Dropdown>
);

export default function Header() {
  const [data, setData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/user");
        setData(res.data.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
      setData(null);
    } catch (error: any) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <Navbar className="border-b-2 py-4">
      <Link href="/" className="flex items-center space-x-2 group">
        <FaBook className="text-indigo-500 group-hover:text-pink-500 transition-colors duration-300" size={24} />
        <span
          className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 
             bg-clip-text text-transparent group-hover:bg-gradient-to-r 
             group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-indigo-500 
             transition-all duration-300"
        >
          Note<span className="font-extrabold">Trade</span>
        </span>
      </Link>

      <div className="flex gap-8 md:order-2 items-center">
        <Navbar.Toggle />

        {loading ? (
          <Spinner aria-label="Loading user data" />
        ) : data ? (
          <UserDropdown user={data} logout={logout} router={router} />
        ) : (
          <Link href="/login">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
      </div>

      <Navbar.Collapse className="text-sm sm:text-base font-medium">
        {["Home", "Book", "Notes", "About"].map((item) => {
          const href = item === "Home" ? "/" : `/${item.toLowerCase()}`;
          const isActive = pathname === href;

          return (
            <Navbar.Link
              key={item}
              href={href}
              as={Link}
              className={`${
                isActive ? "text-indigo-600 dark:text-indigo-400" : ""
              }`}
            >
              {item}
            </Navbar.Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
}
