import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              CodeFlow
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Intelligent AI-powered code review and documentation generation
              tool for developers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/review"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Code Review
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-900/20 dark:hover:bg-white/20 text-gray-900 dark:text-white flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-900/20 dark:hover:bg-white/20 text-gray-900 dark:text-white flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-900/20 dark:hover:bg-white/20 text-gray-900 dark:text-white flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-900/20 dark:hover:bg-white/20 text-gray-900 dark:text-white flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <p>&copy; {currentYear} CodeFlow. All rights reserved.</p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
