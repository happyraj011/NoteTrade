import { Card } from "flowbite-react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link"; // Import Link for dynamic navigation
import { FaBook } from "react-icons/fa"; // Import FaBook from react-icons

export default function Home() {
  return (
    <>
      <Head>
        <title>NoteTrade - Explore Our Collection 📚</title>
        <meta
          name="description"
          content="Discover the best prices for buying and selling textbooks. Explore our exclusive authors and trending books today!"
        />
      </Head>

      <main className="flex flex-col min-h-screen bg-[#C8DDFC] overflow-hidden">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12 bg-white">
          {/* Left Text Section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            {/* Custom Logo */}
            <Link href="/" className="flex items-center space-x-4 group mb-4">
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

            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
              Explore Our Collection 📚
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Discover the best prices for buying and selling textbooks. Explore our exclusive authors and trending books today!
            </p>
            {/* Dynamic Explore Button */}
            <Link href="/notes">
              <button className="mt-6 px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 transition duration-300">
                Explore Now
              </button>
            </Link>
          </div>

          {/* Right Image Section */}
          <div className="lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <Image
              src="https://www.shutterstock.com/shutterstock/photos/1409900939/display_1500/stock-vector-cool-flat-design-illustration-on-book-lovers-reading-books-sitting-lying-and-standing-next-to-a-1409900939.jpg"
              alt="Reading Character"
              width={400}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Cards for Featured Sections */}
        <div className="flex flex-col md:flex-row justify-center gap-8 px-8 py-12 bg-white">
          {/* Featured Author Card */}
          <Card className="shadow-2xl border border-gray-200 w-full md:w-1/2 xl:w-1/3">
            <div className="flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src="https://www.shutterstock.com/shutterstock/photos/2443786189/display_1500/stock-vector-bookstore-shop-exterior-and-woman-books-shop-brick-building-education-or-library-market-books-in-2443786189.jpg"
                alt="Exclusive Author"
                width={300}
                height={200}
                className="object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
                placeholder="blur"
                blurDataURL="/path/to/your/blur-image.jpg"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center p-4 text-center">
              <h2 className="text-lg md:text-xl font-semibold">Our Exclusive Author</h2>
              <div className="flex justify-center items-center mt-4">
                {/* Avatars using Flowbite */}
                <div className="relative flex -space-x-4">
                  <Image
                    src="https://via.placeholder.com/64"
                    alt="Author Avatar"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
                    loading="lazy"
                  />
                  <Image
                    src="https://via.placeholder.com/64"
                    alt="Author Avatar"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
                    loading="lazy"
                  />
                  <Image
                    src="https://via.placeholder.com/64"
                    alt="Author Avatar"
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="mt-4">More than 5k books</p>
            </div>
          </Card>

          {/* Trending Books Card */}
          <Card className="shadow-2xl border border-gray-200 w-full md:w-1/2 xl:w-1/3">
            <div className="flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src="https://www.shutterstock.com/shutterstock/photos/1939922722/display_1500/stock-vector-the-girl-is-holding-a-huge-stack-of-books-bibliopole-and-bibliomania-a-type-of-mania-1939922722.jpg"
                alt="Trending Books"
                width={300}
                height={200}
                className="object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
                placeholder="blur"
                blurDataURL="/path/to/your/blur-image.jpg"
                loading="lazy"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center p-4 text-center">
              <h2 className="text-lg md:text-xl font-semibold">Trending Books</h2>
              <p>Explore trending books of this week</p>
              <button className="mt-4 px-6 py-2 bg-[#f06565] text-white font-semibold rounded-lg shadow-md hover:bg-[#d9534f] transition-colors duration-300 ease-in-out">
                View More
              </button>
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}
