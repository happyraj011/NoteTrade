// components/Footer.tsx
import { FaGithub, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f06565] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Join Our Community</h2>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          {/* Social Media Links */}
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-3xl hover:text-[#d9534f] transition-colors duration-300" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-3xl hover:text-[#d9534f] transition-colors duration-300" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl hover:text-[#d9534f] transition-colors duration-300" />
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
            <FaTelegram className="text-3xl hover:text-[#d9534f] transition-colors duration-300" />
          </a>
        </div>
        <div className="text-center">
          <p className="text-sm mb-2">About Us: We are passionate about books and dedicated to bringing you the best collection.</p>
          <p className="text-sm">© 2024 Bookoe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
