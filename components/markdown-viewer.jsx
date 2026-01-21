"use client";

import { Copy, Download } from "lucide-react";
import { useState } from "react";

export default function MarkdownViewer({ markdown, isLoading }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/markdown;charset=utf-8," + encodeURIComponent(markdown)
    );
    element.setAttribute("download", "documentation.md");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (isLoading) {
    return (
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-900 dark:border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Generating documentation...
          </p>
        </div>
      </div>
    );
  }

  if (!markdown) {
    return (
      <div className="p-8 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 border-dashed text-center text-gray-500 dark:text-gray-400">
        Generate documentation to see preview
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100/30 dark:bg-gray-800/30">
        <p className="text-sm font-medium text-gray-900 dark:text-white">
          Preview
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            <Copy className="w-4 h-4" />
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded hover:shadow-lg transition-shadow text-sm"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 prose prose-sm max-w-none">
        <div className="space-y-4 text-sm text-gray-900 dark:text-white">
          {markdown.split("\n").map((line, idx) => {
            if (line.startsWith("# ")) {
              return (
                <h1
                  key={idx}
                  className="text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white"
                >
                  {line.slice(2)}
                </h1>
              );
            } else if (line.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="text-xl font-bold mt-5 mb-2 text-gray-900 dark:text-white"
                >
                  {line.slice(3)}
                </h2>
              );
            } else if (line.startsWith("### ")) {
              return (
                <h3
                  key={idx}
                  className="text-lg font-bold mt-4 mb-2 text-gray-900 dark:text-white"
                >
                  {line.slice(4)}
                </h3>
              );
            } else if (line.startsWith("- ")) {
              return (
                <li key={idx} className="ml-4 text-gray-500 dark:text-gray-400">
                  {line.slice(2)}
                </li>
              );
            } else if (line === "") {
              return <div key={idx} className="h-2" />;
            } else if (line.includes("`")) {
              // Handle inline code
              const parts = line.split("`");
              return (
                <p key={idx} className="text-gray-500 dark:text-gray-400">
                  {parts.map((part, i) =>
                    i % 2 === 0 ? (
                      part
                    ) : (
                      <code
                        key={i}
                        className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-900 dark:text-white"
                      >
                        {part}
                      </code>
                    )
                  )}
                </p>
              );
            } else {
              return (
                <p key={idx} className="text-gray-500 dark:text-gray-400">
                  {line}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
