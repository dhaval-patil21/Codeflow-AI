"use client";

import { useRef } from "react";

export default function CodeEditor({
  language = "javascript",
  value = "",
  onChange = () => {},
  placeholder = "Paste your code here...",
}) {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="code-editor-wrapper h-96 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
      {/* Language indicator */}
      <div className="px-4 py-2 bg-gray-100/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 font-mono flex items-center justify-between">
        <span>{language}</span>
      </div>

      {/* Editor area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 px-4 py-4 font-mono text-sm resize-none focus:outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400/50 dark:placeholder-gray-500/50 whitespace-pre-wrap break-words"
        spellCheck="false"
      />
    </div>
  );
}
