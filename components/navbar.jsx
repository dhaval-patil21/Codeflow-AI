"use client";

import Link from "next/link";
import { useState } from "react";
import { Code2, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-pink-500 dark:from-blue-500 dark:to-pink-500 rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white sm:inline">
              CodeFlow AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/review"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Review Code
            </Link>
            <Link
              href="/docs"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Generate Docs
            </Link>
            <Link
              href="/history"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              History
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* <Link
              href="/login"
              className="px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Sign In
            </Link> */}
            <Link
              href="/review"
              className="px-4 py-2 bg-gradient-to-r from-blue-800 to-pink-500 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/review"
              className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Review Code
            </Link>
            <Link
              href="/docs"
              className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Generate Docs
            </Link>
            <Link
              href="/history"
              className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              History
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              {/* <Link
                href="/login"
                className="block px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-center"
              >
                Sign In
              </Link> */}
              <Link
                href="/review"
                className="block px-3 py-2 bg-gradient-to-r from-blue-800 to-pink-500 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg text-sm font-medium text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
