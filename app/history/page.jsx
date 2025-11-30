"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Calendar, FileText, Code, Trash2 } from "lucide-react"
import { useState } from "react"

export default function HistoryPage() {
  const [history, setHistory] = useState([
    {
      id: 1,
      type: "review",
      title: "React Hook Implementation",
      date: new Date("2024-11-30"),
      language: "javascript",
      score: 82,
    },
    {
      id: 2,
      type: "docs",
      title: "API Documentation Generated",
      date: new Date("2024-11-29"),
      language: "typescript",
      lines: 245,
    },
    {
      id: 3,
      type: "review",
      title: "Python Data Processing",
      date: new Date("2024-11-28"),
      language: "python",
      score: 78,
    },
  ])

  const handleDelete = (id) => {
    setHistory(history.filter((item) => item.id !== id))
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
                            {item.date.toLocaleDateString()}
                          </span>
                          {item.score && <span>Score: {item.score}/100</span>}
                          {item.lines && <span>{item.lines} lines</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="px-3 py-2 bg-secondary rounded hover:bg-secondary/80 transition-colors text-sm font-medium">
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
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
        </div>
      </main>
      <Footer />
    </div>
  )
}
