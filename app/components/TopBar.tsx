"use client";
import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { useSession } from "next-auth/react";
import { useRouter, } from "next/navigation";
import { useSearchedMemes } from "../store/memeStore";
import axios from "axios";
export const TopBar = () => {
  const router = useRouter();
  const { setSearchedMemes } = useSearchedMemes();
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const session = useSession();
  const user = session.data?.user;

const [userName, setUserName] = useState<string | null>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    setUserName(localStorage.getItem("Name"));
  }
}, []);

  function handleFocus() {
    setIsFocused(true);
  }
  function handleBlur() {
    setValue("");
    setIsFocused(false);
  }

  const searchedTags = value
    .toLowerCase()
    .split(/[,\s]+/)
    .map((tag) => tag.trim());

  const queryString = searchedTags.map(tag => `tags=${encodeURIComponent(tag)}`).join('&');
  const url = `/search?${queryString}`;

  async function handleSearch(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setLoading(true);
      const res = await axios.get(`/api/search?${queryString}`);
      setSearchedMemes(res.data.searchedMemes);
      router.push(url);
      setLoading(false);
    }
  }
    
  return (
    <div className="flex justify-center items-center pr-5">
      <div className="relative mx-5 w-full">
        <InputBox
          id="searchBox"
          value={value}
          className="h-10 rounded-xl pl-10 text-gray-800"
          placeholder="Search"
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={handleSearch}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
        {isFocused && !loading && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6 "
              onClick={handleBlur}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        )}
        {loading && (
          <div
            role="status"
            className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
      <div className="h-8 w-8.5 rounded-full bg-gray-300 flex items-center justify-center">
        {user?.image ? (
          <img
            className="rounded-full w-full h-full"
            src={user?.image}
            alt="Profile"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div>{userName?.split("")[0]}</div>
        )}
      </div>
    </div>
  );
};