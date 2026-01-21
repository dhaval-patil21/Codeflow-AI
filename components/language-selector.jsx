"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX/React" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "sql", label: "SQL" },
  { value: "html", label: "HTML" },
];

export default function LanguageSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = LANGUAGES.find((l) => l.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        {selected?.label || "Select Language"}
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.value}
              onClick={() => {
                onChange(lang.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
