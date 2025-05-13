"use client";

import Link from "next/link";
import uniqid from "uniqid";

export default function Home() {
  const roomId = uniqid();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-12">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-6 tracking-tight">
        Welcome to ColorScramble
      </h1>

      <p className="text-base sm:text-lg text-gray-400 text-center max-w-md mb-10">
        Dive into a fast-paced color challenge. Create a room and invite your friends to join the scramble!
      </p>

      <Link
        href={`/start-game/${roomId}`}
        className="px-8 py-3 bg-white text-black rounded-full font-semibold text-lg sm:text-xl hover:bg-gray-300 transition duration-200 shadow-lg"
      >
        Start Game
      </Link>

      <p className="text-sm text-gray-500 mt-6 text-center max-w-xs">
        Share the room link with friends once your game starts.
      </p>
    </div>
  );
}
