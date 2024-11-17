// pages/index.tsx
import { Card } from "flowbite-react";
import Image from "next/image";
import Head from 'next/head';
import { Avatar } from 'flowbite-react';
import Footer from "@/components/footer";


export default function Home() {
  return (
    <>
      <Head>
        <title>Bookoe - Explore Our Collection</title>
        <meta name="description" content="Discover the best prices for buying and selling textbooks. Explore our exclusive authors and trending books today!" />
      </Head>
      <main className="flex flex-col min-h-screen bg-[#C8DDFC] overflow-hidden">
        {/* Parallax Section with Main Heading */}
        <div className="relative bg-fixed bg-center bg-cover h-[600px] flex items-center justify-center"
          style={{
            backgroundImage: "url('https://www.shutterstock.com/shutterstock/photos/1409900939/display_1500/stock-vector-cool-flat-design-illustration-on-book-lovers-reading-books-sitting-lying-and-standing-next-to-a-1409900939.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
          }}
        >
          <div className="text-center p-8 bg-[#f06565] bg-opacity-70 rounded-lg shadow-xl" style={{ maxWidth: '800px' }}>
            <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-md">
              Explore Our Collection
            </h1>
            <p className="text-white text-xl md:text-2xl mt-4">
              Find your next great read with us. Dive into our extensive collection.
            </p>
          </div>
        </div>

        {/* Cards for Featured Sections */}
        <div className="flex flex-col md:flex-row justify-around items-center p-12 bg-white">
          <Card className="shadow-2xl border border-gray-200">
            <div className="flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src="https://www.shutterstock.com/shutterstock/photos/2443786189/display_1500/stock-vector-bookstore-shop-exterior-and-woman-books-shop-brick-building-education-or-library-market-books-in-2443786189.jpg"
                alt="Exclusive Author"
                width={300}
                height={200}
                className="object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
                placeholder="blur"
                blurDataURL="/path/to/your/blur-image.jpg"
              />
            </div>
            <div className="flex-1 flex flex-col justify-center p-4 text-center">
              <h2 className="text-lg md:text-xl font-semibold">Our Exclusive Author</h2>
              <div className="flex justify-center items-center mt-4">
                {/* Avatars using Flowbite */}
                <div className="relative flex -space-x-4">
                  <Avatar img="https://via.placeholder.com/64" alt="Author Avatar" className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md" />
                  <Avatar img="https://via.placeholder.com/64" alt="Author Avatar" className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md" />
                  <Avatar img="https://via.placeholder.com/64" alt="Author Avatar" className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-md" />
                </div>
              </div>
              <p className="mt-4">More than 5k books</p>
            </div>
          </Card>
          <Card className="shadow-2xl border border-gray-200">
            <div className="flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src="https://www.shutterstock.com/shutterstock/photos/1939922722/display_1500/stock-vector-the-girl-is-holding-a-huge-stack-of-books-bibliopole-and-bibliomania-a-type-of-mania-1939922722.jpg"
                alt="Trending Books"
                width={300}
                height={200}
                className="object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-105"
                placeholder="blur"
                blurDataURL="/path/to/your/blur-image.jpg"
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
