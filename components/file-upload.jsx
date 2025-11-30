"use client"

import { Upload } from "lucide-react"
import { useRef } from "react"

export default function FileUpload({ onFileLoad, accept = ".js,.jsx,.ts,.tsx,.py,.java,.go,.cpp,.csharp,.php,.sql" }) {
  const inputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result
        if (typeof content === "string") {
          onFileLoad(content, file.name)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" onChange={handleFileChange} accept={accept} className="hidden" />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border hover:bg-secondary/80 transition-colors"
      >
        <Upload className="w-4 h-4" />
        Upload File
      </button>
    </div>
  )
}
