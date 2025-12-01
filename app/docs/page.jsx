
"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CodeEditor from "@/components/code-editor"
import FileUpload from "@/components/file-upload"
import LanguageSelector from "@/components/language-selector"
import MarkdownViewer from "@/components/markdown-viewer"
import { FileText } from "lucide-react"
import { addDocs } from "@/lib/localStorage"

export default function DocsPage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [markdown, setMarkdown] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateDocs = async () => {
    if (!code.trim()) {
      alert("Please enter or upload some code")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      })
      const data = await response.json()
      setMarkdown(data.markdown || "")

      addDocs({
        title: `${language.charAt(0).toUpperCase() + language.slice(1)} Documentation`,
        language,
        code: code.substring(0, 500),
        markdown: data.markdown || "",
      })
    } catch (error) {
      console.error("Error:", error)
      alert("Error generating documentation")
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileLoad = (content, filename) => {
    setCode(content)
    const ext = filename.split(".").pop()?.toLowerCase()
    const languageMap = {
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "typescript",
      py: "python",
      java: "java",
      go: "go",
      cpp: "cpp",
      cs: "csharp",
      php: "php",
    }
    if (ext && languageMap[ext]) {
      setLanguage(languageMap[ext])
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Generate Documentation</h1>
            <p className="text-muted-foreground">Transform your code into comprehensive, professional documentation</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Input */}
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <LanguageSelector value={language} onChange={setLanguage} />
                <FileUpload onFileLoad={handleFileLoad} />
              </div>

              <CodeEditor
                language={language}
                value={code}
                onChange={setCode}
                placeholder="Paste your code here or upload a file..."
              />

              <button
                onClick={handleGenerateDocs}
                disabled={isLoading || !code.trim()}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {isLoading ? "Generating..." : "Generate Docs"}
              </button>
            </div>

            {/* Right Panel - Output */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Documentation</h2>
              <MarkdownViewer markdown={markdown} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
