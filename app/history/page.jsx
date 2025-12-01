
"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Calendar, FileText, Code, Trash2, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { getAllHistory, deleteReview, deleteDocs } from "@/lib/localStorage"

export default function HistoryPage() {
  const [history, setHistory] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const allHistory = getAllHistory()
    setHistory(allHistory)
  }, [])

  const handleDelete = (id, type) => {
    if (type === "review") {
      deleteReview(id)
    } else {
      deleteDocs(id)
    }
    setHistory(history.filter((item) => item.id !== id))
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 py-12">
          <div className="max-w-4xl mx-auto px-4">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">History</h1>
            <p className="text-muted-foreground">View and manage your past reviews and generated documentation</p>
          </div>

          {history.length > 0 ? (
            <div className="space-y-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4 flex-1">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {item.type === "review" ? (
                          <Code className="w-6 h-6 text-primary" />
                        ) : (
                          <FileText className="w-6 h-6 text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{item.title}</h3>
                          <span className="px-2 py-1 bg-secondary rounded text-xs font-medium">{item.language}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
                        className="px-3 py-2 bg-secondary rounded hover:bg-secondary/80 transition-colors text-sm font-medium flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.type)}
                        className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
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
              <div className="w-16 h-16 rounded-lg bg-secondary mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No history yet</h2>
              <p className="text-muted-foreground mb-6">Start by running a code review or generating documentation</p>
              <div className="flex gap-3 justify-center">
                <a
                  href="/review"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:shadow-lg transition-shadow"
                >
                  Run Review
                </a>
                <a
                  href="/docs"
                  className="px-4 py-2 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-colors"
                >
                  Generate Docs
                </a>
              </div>
            </div>
          )}

          {/* Detail Modal */}
          {selectedItem && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-card rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto w-full p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedItem.title}</h2>
                    <p className="text-sm text-muted-foreground">{new Date(selectedItem.createdAt).toLocaleString()}</p>
                  </div>
                  <button onClick={() => setSelectedItem(null)} className="text-xl font-bold hover:opacity-70">
                    ✕
                  </button>
                </div>
                <div className="space-y-4">
                  {selectedItem.type === "review" && selectedItem.analysis && (
                    <div>
                      <h3 className="font-semibold mb-2">Analysis Results</h3>
                      <div className="bg-secondary/50 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-96">
                        {typeof selectedItem.analysis === "object"
                          ? JSON.stringify(selectedItem.analysis, null, 2)
                          : selectedItem.analysis}
                      </div>
                    </div>
                  )}
                  {selectedItem.type === "docs" && selectedItem.markdown && (
                    <div>
                      <h3 className="font-semibold mb-2">Generated Documentation</h3>
                      <div className="bg-secondary/50 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-96">
                        {selectedItem.markdown}
                      </div>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2">Original Code</h3>
                    <div className="bg-secondary/50 p-4 rounded text-sm whitespace-pre-wrap overflow-auto max-h-96 font-mono">
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
  )
}
