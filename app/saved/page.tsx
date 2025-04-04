"use client";

import { useEffect, useState } from "react";
import { meme } from "../store/memeStore";
import axios from "axios";
import { MemeCard } from "../components/memeCard";
import { Loader } from "../components/Loader";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SavedMemesPage() {
  const { status } = useSession();
  const [savedMemes, setSavedMemes] = useState<meme[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/signin");
    }
  }, [status]);

  useEffect(() => {
    setLoading(true);
    axios.get("api/save").then((res) => {
      setSavedMemes(res.data.savedMemes);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <div className="flex justify-center items-center h-full w-full ">
      <Loader />
    </div>
  ) : (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
      {savedMemes.map((meme) => {
        return (
          <MemeCard
            key={meme.id}
            id={meme.id}
            type={meme.fileType}
            src={meme.fileUrl}
            isSaved={true}
          ></MemeCard>
        );
      })}
    </div>
  );
}
