import React from "react";
import { FaBook, FaUserFriends, FaRegLightbulb } from "react-icons/fa"; // Book, Users, and Idea icons
import Image from "next/image"; // For image optimization

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-200">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#F06565] mb-6">
            Welcome to NoteTrade 📚
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            The easiest and most fun way to buy and sell textbooks and study notes.
            Join the community of students, book enthusiasts, and knowledge seekers today!
          </p>
          <a href="/book">
            <button className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
              Get Started
            </button>
          </a>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-[#F06565] mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            At <strong>NoteTrade</strong>, we believe that sharing knowledge should be easy, fun, and accessible. We strive to make textbooks and study materials available to everyone, everywhere, for an affordable price.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <FaBook className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Explore Books</h3>
            <p className="text-lg text-gray-600">
              A huge collection of textbooks and study notes for all your learning needs.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <FaUserFriends className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Join the Community</h3>
            <p className="text-lg text-gray-600">
              Connect with fellow students and share notes to help each other succeed.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <FaRegLightbulb className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold">Boost Your Learning</h3>
            <p className="text-lg text-gray-600">
              Access notes and books to enhance your learning experience and stay ahead.
            </p>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-[#F06565] mb-6">
            Why NoteTrade?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                <strong>Secure Payments</strong> with PayPal and other trusted services.
              </p>
              <p className="text-lg text-gray-600">
                <strong>Fast Delivery</strong> of digital files or physical copies right to your door.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-lg text-gray-600">
                A <strong>Mobile-First Experience</strong> to access your books and notes anytime, anywhere.
              </p>
              <p className="text-lg text-gray-600">
                <strong>Easy to Use</strong> interface for effortless browsing and buying.
              </p>
            </div>
          </div>
        </div>

        {/* Join Us Section */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-700 mb-6">
            Ready to explore? Join the community of book lovers and knowledge seekers. With NoteTrade, it’s never been easier to buy and sell your books and notes!
          </p>
          <a href="/notes">
            <button className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
              Start Now
            </button>
          </a>
        </div>
      </div>

      
    </div>
  );
}
