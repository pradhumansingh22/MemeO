"use client";
import { meme } from "@/app/store/memeStore";
import { useMemeStore } from "@/app/store/memeStore";
import { redirect, useParams } from "next/navigation";
import { DetailsCard } from "@/app/components/DetailsCard";
import { useEffect, useState } from "react";
import { montserrat } from "@/app/lib/utils/fonts";
import { Loader } from "@/app/components/Loader";
import LikeButton from "@/app/components/LikeButton";
import { useSession } from "next-auth/react";

export default function MemePage() {
  const session = useSession();
  if (!session.data?.user) redirect("/signin");

  const [meme, setMeme] = useState<meme>();
  const params = useParams();
  const memeId = params.id;
  const { memes, fetchMemes } = useMemeStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (memes.length === 0) {
      setLoading(true);
      fetchMemes().then(() => {
        setLoading(false);
      });
    }
  }, [fetchMemes]);

  useEffect(() => {
    if (memeId && memes.length > 0) {
      const foundMeme = memes.find((m) => m.id === memeId);
      setMeme(foundMeme);
      setLoading(false);
    }
  }, [memeId, memes]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-10 flex justify-center">
      <div className="border border-gray-300 rounded-lg p-4 md:p-6 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 max-w-screen-lg w-full">
        {/* Media Section */}
        <div className="col-span-1 md:col-span-2">
          <DetailsCard src={meme?.fileUrl!} type={meme?.fileType || "IMAGE"} />
        </div>

        {/* Info Section */}
        <div className="col-span-1 md:col-span-3">
          <div className="flex flex-col gap-4">
            {/* Like and Caption */}
            <div className="flex items-center gap-2">
              <LikeButton memeId={memeId as string} />
              <div
                className={`${montserrat.className} text-lg md:text-xl font-semibold break-words`}
              >
                {meme?.caption}
              </div>
            </div>

            {/* Tags */}
            <div
              className={`${montserrat.className} border border-gray-300 rounded-lg px-2 py-2`}
            >
              <h1 className="font-semibold">Tags</h1>
              <div className="text-sm md:text-base">
                {meme?.tags.map((tag) => "#" + tag + " ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
