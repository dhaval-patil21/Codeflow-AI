"use client";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Calendar, FileText, Code, Trash2, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { getAllHistory, deleteReview, deleteDocs } from "@/lib/localStorage";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const allHistory = getAllHistory();
    setHistory(allHistory);
  }, []);

  const handleDelete = (id, type) => {
    if (type === "review") {
      deleteReview(id);
    } else {
      deleteDocs(id);
    }
    setHistory(history.filter((item) => item.id !== id));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-4 text-gray-900 dark:text-white">
            Loading...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              History
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              View and manage your past reviews and generated documentation
            </p>
          </div>

          {history.length > 0 ? (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0">
                        {item.type === "review" ? (
                          <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded text-xs font-medium">
                            {item.language}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                          {item.score && <span>Score: {item.score}/100</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedItem(item)}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.type)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded transition-colors text-red-600 dark:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                No history yet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Start by running a code review or generating documentation
              </p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/review"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Run Review
                </a>
                <a
                  href="/docs"
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Generate Docs
                </a>
              </div>
            </div>
          )}

          {/* Detail Modal */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                      {selectedItem.title}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(selectedItem.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="text-xl font-bold text-gray-900 dark:text-white hover:opacity-70"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedItem.type === "review" && selectedItem.analysis && (
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                        Analysis Results
                      </h3>
                      <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded text-sm text-gray-900 dark:text-white whitespace-pre-wrap overflow-auto max-h-96">
                        {typeof selectedItem.analysis === "object"
                          ? JSON.stringify(selectedItem.analysis, null, 2)
                          : selectedItem.analysis}
                      </div>
                    </div>
                  )}
                  {selectedItem.type === "docs" && selectedItem.markdown && (
                    <div>
                      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                        Generated Documentation
                      </h3>
                      <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded text-sm text-gray-900 dark:text-white whitespace-pre-wrap overflow-auto max-h-96">
                        {selectedItem.markdown}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">
                      Original Code
                    </h3>
                    <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded text-sm text-gray-900 dark:text-white whitespace-pre-wrap overflow-auto max-h-96 font-mono">
                      {selectedItem.code}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
