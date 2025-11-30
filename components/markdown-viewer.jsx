"use client"

import { Copy, Download } from "lucide-react"
import { useState } from "react"

export default function MarkdownViewer({ markdown, isLoading }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/markdown;charset=utf-8," + encodeURIComponent(markdown))
    element.setAttribute("download", "documentation.md")
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (isLoading) {
    return (
      <div className="p-8 bg-card rounded-lg border border-border flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Generating documentation...</p>
        </div>
      </div>
    )
  }

  if (!markdown) {
    return (
      <div className="p-8 bg-card rounded-lg border border-border border-dashed text-center text-muted-foreground">
        Generate documentation to see preview
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-secondary/30">
        <p className="text-sm font-medium">Preview</p>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded hover:bg-secondary/80 transition-colors text-sm"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded hover:shadow-lg transition-shadow text-sm"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 prose prose-sm max-w-none">
        <div className="space-y-4 text-sm prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded">
          {markdown.split("\n").map((line, idx) => {
            if (line.startsWith("# ")) {
              return (
                <h1 key={idx} className="text-2xl font-bold mt-6 mb-3">
                  {line.slice(2)}
                </h1>
              )
            } else if (line.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-xl font-bold mt-5 mb-2">
                  {line.slice(3)}
                </h2>
              )
            } else if (line.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-lg font-bold mt-4 mb-2">
                  {line.slice(4)}
                </h3>
              )
            } else if (line.startsWith("- ")) {
              return (
                <li key={idx} className="ml-4">
                  {line.slice(2)}
                </li>
              )
            } else if (line === "") {
              return <div key={idx} className="h-2" />
            } else {
              return <p key={idx}>{line}</p>
            }
          })}
        </div>
      </div>
    </div>
  )
}
