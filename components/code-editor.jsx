"use client"

import { useRef } from "react"

export default function CodeEditor({
  language = "javascript",
  value = "",
  onChange = () => {},
  placeholder = "Paste your code here...",
}) {
  const textareaRef = useRef(null)

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="code-editor-wrapper h-96 bg-card rounded-lg border border-border overflow-hidden flex flex-col">
      {/* Language indicator */}
      <div className="px-4 py-2 bg-secondary/50 border-b border-border text-xs text-muted-foreground font-mono flex items-center justify-between">
        <span>{language}</span>
      </div>

      {/* Editor area */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex-1 px-4 py-4 font-mono text-sm resize-none focus:outline-none bg-card text-foreground placeholder-muted-foreground/50 whitespace-pre-wrap break-words"
        spellCheck="false"
      />
    </div>
  )
}
