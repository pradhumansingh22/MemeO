"use client"

import { useEffect, useState } from "react"

export const Phrases = () => {
    const [currentPhrase, setCurrentPhrase] = useState(0);
    const phrases = [
        "hilarious meme",
        "dank reaction",
        "viral moment",
        "relatable joke",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        }, 3000);
        return () => clearInterval(interval);
    }, );

    return (
      <section className="relative z-10 py-16 md:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-2 text-center px-4">
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl text-gray-900">
            Get your next
          </h1>
          <h2 className="text-4xl font-bold leading-tight tracking-tighter text-amber-600 md:text-5xl lg:text-6xl">
            {phrases[currentPhrase]}
          </h2>

          <div className="flex gap-2 mt-4">
            {phrases.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentPhrase ? "bg-amber-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
}