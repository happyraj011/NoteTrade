import React from "react";
import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from "react-icons/bs";
import Link from "next/link";
import { FaBook } from "react-icons/fa";

export default function FooterCom() {
  return (
    <Footer container className="bg-gray-900 text-white">
      <div className="w-full max-w-7xl mx-auto px-8 py-6">
        {/* Main Footer Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo Section */}
          <div className="flex items-center space-x-4 justify-center md:justify-start">
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
          </div>

          {/* Links Section */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* About Section */}
            <div>
              <Footer.Title title="About" className="text-gray-300 text-lg" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-400 text-sm"
                >
                  Note Trade
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Follow Us Section */}
            <div>
              <Footer.Title title="Follow us" className="text-gray-300 text-lg" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/happyraj011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-400 text-sm"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:underline text-gray-400 text-sm"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Legal Section */}
            <div>
              <Footer.Title title="Legal" className="text-gray-300 text-lg" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  className="hover:underline text-gray-400 text-sm"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="hover:underline text-gray-400 text-sm"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider className="my-6 border-gray-700" />

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <Footer.Copyright
            href="#"
            by="Expiry Notifier"
            year={new Date().getFullYear()}
            className="text-gray-400 text-sm"
          />
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Footer.Icon
              href="https://facebook.com"
              icon={BsFacebook}
              className="hover:text-gray-300 text-2xl"
              aria-label="Facebook"
            />
            <Footer.Icon
              href="https://instagram.com"
              icon={BsInstagram}
              className="hover:text-gray-300 text-2xl"
              aria-label="Instagram"
            />
            <Footer.Icon
              href="https://twitter.com"
              icon={BsTwitter}
              className="hover:text-gray-300 text-2xl"
              aria-label="Twitter"
            />
            <Footer.Icon
              href="https://github.com/happyraj011"
              icon={BsGithub}
              className="hover:text-gray-300 text-2xl"
              aria-label="Github"
            />
            <Footer.Icon
              href="https://dribbble.com"
              icon={BsDribbble}
              className="hover:text-gray-300 text-2xl"
              aria-label="Dribbble"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
