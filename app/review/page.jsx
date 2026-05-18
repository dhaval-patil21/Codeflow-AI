"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CodeEditor from "@/components/code-editor";
import FileUpload from "@/components/file-upload";
import LanguageSelector from "@/components/language-selector";
import AnalysisPanel from "@/components/analysis-panel";
import { Zap } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { apiClient } from "@/lib/api-client";

export default function ReviewPage() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      fetchProjects();
    }
  }, [isAuthenticated, router]);

  const fetchProjects = async () => {
    const response = await apiClient.getProjects();
    if (!response.error && response.data) {
      const projectsList = response.data as any[];
      setProjects(projectsList);
      if (projectsList.length > 0) {
        setProjectId(projectsList[0].id);
        setSelectedProject(projectsList[0]);
      }
    }
  };

  const handleRunReview = async () => {
    if (!code.trim()) {
      alert("Please enter or upload some code");
      return;
    }

    if (!projectId) {
      alert("Please select or create a project first");
      return;
    }

    setIsLoading(true);
    try {
      console.log("[v0] Starting code review request");
      const response = await apiClient.analyzeCode(projectId, code, language);
      
      if (response.error) {
        throw new Error(response.error);
      }

      console.log("[v0] Review response:", response.data);
      setAnalysis(response.data);
    } catch (error) {
      console.error("[v0] Error during review:", error);
      alert(`Error running review: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileLoad = (content, filename) => {
    setCode(content);
    const ext = filename.split(".").pop()?.toLowerCase();
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
    };
    if (ext && languageMap[ext]) {
      setLanguage(languageMap[ext]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
              Code Review
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Paste or upload code to get AI-powered insights and
              recommendations
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Panel - Input */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Select Project
                </label>
                <select
                  value={projectId || ""}
                  onChange={(e) => {
                    const selected = projects.find(p => p.id === parseInt(e.target.value));
                    setProjectId(parseInt(e.target.value));
                    setSelectedProject(selected || null);
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-background text-foreground"
                >
                  <option value="">Choose a project...</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                {projects.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Create a project in your dashboard first
                  </p>
                )}
              </div>

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
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-pink-600 dark:from-blue-500 dark:to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                {isLoading ? "Analyzing..." : "Run Review"}
              </button>
            </div>

            {/* Right Panel - Output */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Review Results
              </h2>
              <AnalysisPanel analysis={analysis} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
