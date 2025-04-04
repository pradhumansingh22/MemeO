"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { MemeCard } from "./memeCard";
import { useMemeStore } from "../store/memeStore";
import { Loader } from "./Loader";

export const Memes = () => {
  const { memes, setMemes } = useMemeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("api/memes").then((res) => {
      setMemes(res.data.memes);
      setLoading(false);
    });
  },[]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full ">
        <Loader />
      </div>
    );
  }

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
      {memes.map((meme) => (
        <MemeCard
          key={meme.id}
          id={meme.id}
          type={meme.fileType}
          src={meme.fileUrl}
          isSaved={meme.isSaved}
        />
      ))}
    </div>
  );
};
