// app/components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-4 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end items-center h-16">
          {/* Hamburger Menu Button - Always visible */}
          <div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#523529] hover:text-gray-600 focus:outline-none transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Navigation Menu - Only appears when hamburger is clicked */}
        {isMenuOpen && (
          <div className="bg-[#fcf8f5] border border-gray-300 shadow-lg rounded-lg">
            <div className="px-2 pt-2 pb-4 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-[#523529] hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <hr className="border-gray-300" />
              <Link
                href="/Login"
                className="block px-3 py-2 text-[#523529] hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
              <hr className="border-gray-300" />
              <Link
                href="/contact"
                className="block px-3 py-2 text-[#523529] hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Über uns
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
