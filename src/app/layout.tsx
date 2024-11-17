import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { CartProvider } from "@/context/CartContext";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteTrade - Your Book Marketplace",
  description: "Discover the best deals for buying and selling textbooks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Main Layout Wrapper */}
        <div className="flex flex-col min-h-screen">
          {/* Header Section */}
          <Header />
          
          {/* Main Content Wrapper */}
          <div className="flex flex-1">
            {/* Sidebar */}
            <Sidebar />
            
            {/* Content Area */}
            <div className="flex-1 p-6">
              <CartProvider>
                {children}
              </CartProvider>
            </div>
          </div>
          
          {/* Footer Section */}
          <Footer />
        </div>
      </body>
    </html>
  );
}
