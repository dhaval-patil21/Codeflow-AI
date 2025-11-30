"use client"

import Link from "next/link"
import { useState } from "react"
import { Code2, Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:shadow-lg transition-shadow">
              <Code2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg  sm:inline">CodeFlow AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/review"
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Review Code
            </Link>
            <Link
              href="/docs"
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Generate Docs
            </Link>
            <Link
              href="/history"
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              History
            </Link>
            <Link
              href="/dashboard"
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Dashboard
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/review"
              className="px-4 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link
              href="/review"
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Review Code
            </Link>
            <Link
              href="/docs"
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Generate Docs
            </Link>
            <Link
              href="/history"
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              History
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors"
            >
              Dashboard
            </Link>
            <div className="pt-4 flex flex-col gap-2">
              <Link
                href="/login"
                className="block px-3 py-2 text-sm font-medium rounded-lg hover:bg-secondary transition-colors text-center"
              >
                Sign In
              </Link>
              <Link
                href="/review"
                className="block px-3 py-2 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg text-sm font-medium text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
