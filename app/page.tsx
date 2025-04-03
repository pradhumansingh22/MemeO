import Link from "next/link";
import Button from "./components/ui/Button";
import { Phrases } from "./components/ui/Phrases";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center justify-center gap-1">
              <img src="/memeo.svg" alt="MemeO Logo" className="w-6 h-6 mt-1" />
              <span className="text-lg font-bold">MemeO</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <nav className="hidden md:flex gap-6"></nav>
            <Link href={"/signin"}>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full font-semibold cursor-pointer"
              >
                Log in
              </Button>
            </Link>
            <Link href={"/signup"}>
              <Button
                size="sm"
                className="rounded-full bg-red-600 hover:bg-red-700 font-semibold cursor-pointer"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16">
        {/* Central headline */}
        <Phrases />

        {/* Pinterest-style image collage */}
        <div className="relative ">
          <div className="absolute inset-0  pointer-events-none "></div>

          {/* Left column */}
          <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-4 px-4 max-w-[1400px] -mt-12">
              {/* Column 1 */}
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-md transform -translate-y-12">
                  <img
                    src="https://m.media-amazon.com/images/I/813kqvYoRfL.png"
                    width={250}
                    height={400}
                    alt="Meme"
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-4 mt-24">
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://ichef.bbci.co.uk/images/ic/480xn/p0kbsfp5.jpg"
                    width={250}
                    height={350}
                    alt="Meme"
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Column 3 */}
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://i.pinimg.com/736x/dc/7e/48/dc7e48444de7674fa3566c8b1ffd41d8.jpg"
                    width={250}
                    height={250}
                    alt="Meme"
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Column 4 */}
              <div className="space-y-4 mt-20">
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://i.pinimg.com/736x/c7/54/e8/c754e82936060a83dbd53ba8287cca32.jpg"
                    width={250}
                    height={320}
                    alt="Meme"
                    className="w-full object-cover"
                  />
                </div>
              </div>

              {/* Column 5 */}
              <div className="space-y-4 -mt-16">
                <div className="rounded-2xl overflow-hidden shadow-md">
                  <img
                    src="https://i.pinimg.com/736x/6c/fa/fe/6cfafe994f552bdd7e1550decc70cac5.jpg"
                    width={250}
                    height={380}
                    alt="Meme"
                    className="w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent h-[100px] z-10 pointer-events-none"></div>
        </div>
      </main>

      {/* Yellow banner */}
      <div className="w-full bg-yellow-100 py-4 mt-8">
        <div className="flex justify-center">
          <Button
            variant="link"
            className="flex items-center gap-1 text-black font-medium"
          >
            Here&apos;s how it works
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
