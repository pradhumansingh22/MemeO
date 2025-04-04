"use client";

import Link from "next/link";
import { OpenSans } from "../lib/utils/fonts";
import { useState } from "react";
import axios from "axios";

export const MemeCard = ({
  type,
  src,
  id,
  isSaved,
}: {
  type: string;
  src: string;
  id: string;
  isSaved: boolean;
}) => {

  const [saved, setSaved] = useState(isSaved);

  const handleSave = async () => {
    try {
      if (!saved) {
        const res = await axios.post("/api/save", { memeId: id });
        if (res.status >= 200 && res.status < 300) {
          console.log("Saved");
          setSaved(true);
        } else {
          console.log("Error saving meme");
        }
      } else {
        const res = await axios.delete(`/api/save?memeId=${id}`);
        if (res.status >= 200 && res.status < 300) {
          console.log(res.data.message);
          setSaved(false);
        } else {
          console.log("Error unsaving meme");
          console.log(res.data.message);
        }
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <Link href={`/meme/${id}`}>
      <div
        id={id}
        className={`rounded-md overflow-hidden ${OpenSans.className} cursor-pointer mb-4` }
      >
        {type === "IMAGE" ? (
          <div className="relative group">
            <img
              className="rounded-lg transition-all duration-300 group-hover:brightness-60"
              src={src}
              alt="Meme"
            />
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-red-500 hover:bg-red-800 text-white rounded-full px-3 py-2 transition-all duration-200 cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleSave();
                }}
              >
                {saved ? "Unsave" : "Save"}
              </button>
            </div>
          </div>
        ) : type === "VIDEO" ? (
          <div className="relative group">
            <video
              autoPlay
              muted
                className="rounded-lg transition-all duration-300 group-hover:brightness-60"
              >
                
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-red-500 hover:bg-red-800 text-white rounded-full px-3 py-2 transition-all duration-200 cursor-pointer"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  handleSave(); 
                }}
              >
                {saved ? "Unsave" : "Save"}
              </button>
            </div>
          </div>
        ) : (
          <p>Unsupported type</p>
        )}
      </div>
    </Link>
  );
};
