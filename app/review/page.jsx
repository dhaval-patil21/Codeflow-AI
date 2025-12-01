
"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CodeEditor from "@/components/code-editor"
import FileUpload from "@/components/file-upload"
import LanguageSelector from "@/components/language-selector"
import AnalysisPanel from "@/components/analysis-panel"
import { Zap } from "lucide-react"
import { addReview } from "@/lib/localStorage"

export default function ReviewPage() {
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [analysis, setAnalysis] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRunReview = async () => {
    if (!code.trim()) {
      alert("Please enter or upload some code")
      return
    }

    setIsLoading(true)
    try {
      console.log("[v0] Starting code review request")
      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Review response:", data)
      setAnalysis(data)

      addReview({
        title: `${language.charAt(0).toUpperCase() + language.slice(1)} Code Review`,
        language,
        code: code.substring(0, 500),
        score: data.overallScore || 0,
        analysis: data,
      })
    } catch (error) {
      console.error("[v0] Error during review:", error)
      alert(`Error running review: ${error.message}`)
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
            <h1 className="text-4xl font-bold mb-2">Code Review</h1>
            <p className="text-muted-foreground">Paste or upload code to get AI-powered insights and recommendations</p>
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
                onClick={handleRunReview}
                disabled={isLoading || !code.trim()}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {isLoading ? "Analyzing..." : "Run Review"}
              </button>
            </div>

            {/* Right Panel - Output */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Review Results</h2>
              <AnalysisPanel analysis={analysis} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
