"use client";

import { signIn } from "next-auth/react";
import { GoogleButton } from "../components/GoogleButton";
import InputBox from "../components/InputBox";
import { SignInButton } from "../components/SignInButton";
import { DancingScript } from "../lib/utils/fonts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export  const SignInPage=()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleClick = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      console.log("Invalid something");
    } else {
      console.log("success");
      router.push("/home")
    }
  };
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-5 min-h-screen">
      {/* Left Section */}
      <div className="flex flex-col justify-center items-center md:h-screen col-span-2 px-6">
        <div className="mb-10 w-full max-w-md">
          <div
            className={`${DancingScript.className} text-3xl md:text-5xl text-gray-800 text-center md:text-left`}
          >
            MemeO
          </div>
          <div className="text-2xl md:text-4xl text-gray-600 font-bold mb-4 text-center md:text-left">
            Sign in to MemeO
          </div>
          <div className="text-base md:text-lg text-gray-600 font-semibold my-3 text-center md:text-left">
            Discover Memes that hit the spot.
          </div>

          <div className="flex justify-center md:justify-start">
            <GoogleButton
              label="Sign in with Google"
              onClick={async () => {
                await signIn("google", { callbackUrl: "/home" });
              }}
            />
          </div>

          <div className="flex items-center my-4">
            <div className="bg-gray-300 h-0.5 w-20 md:w-40"></div>
            <div className="px-2 text-gray-400">Or</div>
            <div className="bg-gray-300 h-0.5 w-20 md:w-40"></div>
          </div>

          <InputBox
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            label="Username or Email address"
          />
          <InputBox
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />

          <div className="flex flex-col md:flex-row justify-between gap-4 mt-4">
            <SignInButton
              label="Sign In"
              onClick={handleClick}
              className="w-full md:w-auto"
            />
            <Link
              className="text-blue-800 text-xs underline text-center md:text-left"
              href="/signup"
            >
              Do not have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="col-span-3 w-full h-auto md:h-screen overflow-hidden hidden md:block">
        <img
          src="/login-illustration.png"
          alt="Premium Vector"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
