"use client";

import axios from "axios";
import React, { useState } from "react";

export default function UploadMemeForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>("");
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();

    const tagsArray = tags.toLowerCase().split(",");
    if (tagsArray.length < 4) {
      alert("Add atleast 4 tags");
      return;
    }
    setLoading(true);
    const tagsList = tagsArray.map((tag) => tag.trim());
    formData.append("file", file!);
    formData.append("caption", caption);
    formData.append("tags", JSON.stringify(tagsList));

    const res = await axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data) {
      setLoading(false);
    }
    setIsUploaded(true);
    removeFile();
    setCaption("");
    setTags("");
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) setPreview(URL.createObjectURL(selectedFile));
  }
  const fileType = file?.type.startsWith("image") ? "IMAGE" : "VIDEO";

  const removeFile = () => {
    setPreview(null);
    setFile(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {/* Upload Section */}
      <div className="flex flex-col items-center justify-center col-span-1 w-full">
        <div className="relative rounded-lg w-full h-64 md:h-96 bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:border-red-500 transition-all duration-200">
          {!preview && (
            <div className="flex items-center justify-center flex-col">
              <input
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                type="file"
                onChange={(e) => handleFileChange(e)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 md:h-12 w-10 md:w-12 text-gray-400 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              <span className="text-gray-500 text-sm md:text-lg">
                Click to upload your meme
              </span>
              <span className="text-gray-400 text-xs md:text-sm mt-1">
                or drag and drop
              </span>
            </div>
          )}
          {preview && !isUploaded && (
            <div className="absolute inset-0">
              {fileType === "IMAGE" ? (
                <img
                  className="w-full h-full object-contain"
                  src={preview}
                  alt="uploaded image"
                />
              ) : (
                <video
                  autoPlay
                  muted
                  className="absolute inset-0 w-full h-full object-contain"
                  src={preview}
                />
              )}
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full text-xs font-semibold p-2"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-full w-full md:w-auto px-8 py-3 mt-6 transition-all duration-200"
          onClick={handleUpload}
        >
          {loading ? "Uploading..." : "Upload Meme"}
        </button>
      </div>

      {/* Form Section */}
      <div className="flex flex-col col-span-1 space-y-4 md:space-y-6 w-full">
        {/* Caption Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Caption
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            type="text"
            placeholder="Add a caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* Tags Input */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            type="text"
            placeholder="Add 4 tags describing your meme. (comma-separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
