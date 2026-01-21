"use client";

import { Upload } from "lucide-react";
import { useRef } from "react";

export default function FileUpload({
  onFileLoad,
  accept = ".js,.jsx,.ts,.tsx,.py,.java,.go,.cpp,.csharp,.php,.sql",
}) {
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        if (typeof content === "string") {
          onFileLoad(content, file.name);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <Upload className="w-4 h-4" />
        Upload File
      </button>
    </div>
  );
}
