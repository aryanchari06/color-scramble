"use client";

import Link from "next/link";
import uniqid from "uniqid";

export default function Home() {
  const roomId = uniqid();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-extrabold mb-8">Welcome to Color Memory</h1>
      <Link
        href={`/start-game/${roomId}`}
        className="px-6 py-3 bg-white text-black rounded-xl font-semibold text-lg hover:bg-gray-200 transition duration-200"
      >
        Start Game
      </Link>
    </div>
  );
}
