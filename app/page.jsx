"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { ArrowRight, Zap, Code, FileText } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-br from-white via-white to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 dark:bg-pink-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-sm font-medium mb-4">
                ✨ Powered by AI
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white">
                Your AI Partner for Code Review & Documentation
              </h1>
              <p className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-8">
                Transform your code into insights and documentation — instantly,
                with AI. Your code, decoded. AI turns complexity into clarity
                within seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/review"
                  className="px-6 py-3 bg-gradient-to-r from-blue-800 to-pink-600 dark:from-blue-500 dark:to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2 group"
                >
                  Start Review{" "}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/docs"
                  className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Generate Docs
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                Powerful Features
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Everything you need for professional code analysis and
                documentation
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all group bg-white dark:bg-gray-900">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Code className="w-6 h-6 text-blue-800 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Code Review
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get instant AI-powered code reviews with detailed suggestions,
                  performance tips, and security recommendations.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all group bg-white dark:bg-gray-900">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/30 transition-colors">
                  <FileText className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Doc Generation
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Automatically generate comprehensive README files, API
                  documentation, and code comments.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-lg transition-all group bg-white dark:bg-gray-900">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 transition-colors">
                  <Zap className="w-6 h-6 text-gray-900 dark:text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Lightning Fast
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Powered by the latest AI models for blazing-fast analysis and
                  generation of your code insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                How It Works
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Simple steps to get professional code insights
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  step: 1,
                  title: "Upload Code",
                  desc: "Paste your code or upload a file",
                },
                {
                  step: 2,
                  title: "Select Tool",
                  desc: "Choose review or documentation",
                },
                {
                  step: 3,
                  title: "AI Analysis",
                  desc: "Get instant AI-powered insights",
                },
                {
                  step: 4,
                  title: "Export",
                  desc: "Download results in any format",
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-800 to-pink-600 dark:from-blue-500 dark:to-pink-500 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-100 to-pink-100 dark:from-blue-950/30 dark:to-pink-950/30 border-y border-gray-200 dark:border-gray-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Improve Your Code?
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Start using CodeFlow today and get instant AI-powered code reviews
              and documentation.
            </p>
            <Link
              href="/review"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-800 to-pink-600 dark:from-blue-500 dark:to-pink-500 text-white rounded-lg font-semibold hover:shadow-xl transition-shadow"
            >
              Get Started Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
