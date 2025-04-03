"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import axios from "axios";

export default function LikeButton({ memeId }: { memeId: string }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
      axios.get("/api/likes", { params: { memeId } }).then(res => {
          setLikes(res.data.likes);
          setLiked(res.data.isLiked ? true : false);
      })
  },[memeId]);

    const handleLike = async () => {
        if (!liked) {
           const res = await axios.post("/api/likes", { memeId });
           setLikes(res.data.likes);
           setLiked(!liked);
        } else{
            const res = await axios.delete("/api/likes", { params: { memeId } });
            setLikes(res.data.likes);
            setLiked(!liked);
        }
   
  };

  return (
      <button
      onClick={handleLike}
      className={`flex items-center gap-2 p-2 rounded-xl transition-colors cursor-pointer
        ${liked ? "text-red-500" : "text-gray-500"}`}
    >
      <Heart
        className={`w-6 h-6 transition-all ${
          liked ? "fill-red-500" : "fill-none"
        }`}
      />
      {likes > 0 ? likes:null}
    </button>
  );
}
