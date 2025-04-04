"use client";

import { useSession } from "next-auth/react";
import { MemeCard } from "../components/memeCard";
import { useSearchedMemes } from "../store/memeStore";
import { redirect } from "next/navigation";

export default function SearchPage() {
  const session = useSession();
  if(!session.data?.user)redirect("/signin")

  const { searchedMemes } = useSearchedMemes();

  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
      {searchedMemes.length > 0 ? (
        searchedMemes.map((meme) => {
          return (
            <MemeCard
              key={meme.id}
              id={meme.id}
              type={meme.fileType}
              src={meme.fileUrl}
              isSaved={meme.isSaved}
            ></MemeCard>
          );
        })
      ) : (
        <div className="flex itemes-center justify-center">NO MEMES FOUND</div>
      )}
    </div>
  );
}
