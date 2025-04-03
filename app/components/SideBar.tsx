"use client"
import { signOut } from "next-auth/react";
import Link from "next/link"
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col justify-between items-center border-r border-gray-300">
      {/* Navigation Section */}
      <div className="min-w-15 space-y-10 flex flex-col items-center cursor-pointer">
        <div className="my-6 w-10 h-10">
          <img
            src="/memeo.svg"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </div>

        <Link className="mt-2 relative group cursor-pointer" href="/home">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
          <span className="absolute left-6 top-1/4 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Home
          </span>
        </Link>

        <Link href="/upload" className="relative group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span className="absolute left-6 top-1/4 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Upload
          </span>
        </Link>

        <Link href="/saved" className="relative group cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
          <span className="absolute left-6 top-1/4 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Saved
          </span>
        </Link>
      </div>

      {/* Sign Out Button at Bottom */}
      <div>
        <button
          className="text-sm text-black hover:underline rounded-lg p-2 relative group cursor-pointer"
          onClick={() => {
            signOut();
            router.push("/signin");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          {/* Hover Text */}
          <span className="absolute left-10 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            SignOut
          </span>
        </button>
      </div>
    </div>
  );
}