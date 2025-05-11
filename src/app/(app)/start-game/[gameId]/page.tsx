"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useWs";
import { useParams } from "next/navigation";

export interface colorPayload {
  name: string;
  code: string;
}

export interface gameDataPayload {
  randomColorName: string;
  shuffledObj: colorPayload[];
}

const Page = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState<gameDataPayload | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const {
    gameData: socketData,
    sendMessage,
    scoreYou,
    scoreOpp,
  } = useSocket(gameId);

  useEffect(() => {
    if (socketData) {
      setGameData(socketData);
      setIsAnswered(false);
    }
  }, [socketData]);

  const handleAnswerSubmit = (colorName: string) => {
    setIsAnswered(true);
    const responseEvent =
      colorName === gameData?.randomColorName
        ? "correct-answer"
        : "wrong-answer";
    sendMessage({ event: responseEvent });
  };

  if (!gameData || !gameData.randomColorName) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black text-white text-xl">
        Waiting for partner to join...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b min-h-screen from-black via-zinc-900 to-black text-white px-6 py-10 flex flex-col items-center gap-12">
      {/* Score Display */}
      <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-lg flex gap-6 items-center text-center text-sm sm:text-base font-medium">
        <div>
          <p className="text-zinc-300 mb-1">You</p>
          <p className="text-xl font-bold">{scoreYou}</p>
        </div>
        <div className="h-8 w-[1px] bg-white/30" />
        <div>
          <p className="text-zinc-300 mb-1">Opp</p>
          <p className="text-xl font-bold">{scoreOpp}</p>
        </div>
      </div>

      <div className="my-auto flex flex-col gap-16">
        {/* Color Name */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-wide text-center">
          {gameData.randomColorName}
        </h1>

        {/* Color Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {gameData.shuffledObj.map((color) => (
            <button
              key={color.name}
              disabled={isAnswered}
              onClick={() => handleAnswerSubmit(color.name)}
              className={`h-32 w-32 rounded-2xl shadow-md flex items-center justify-center text-white font-semibold text-lg transition-transform duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
              style={{ backgroundColor: color.code }}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
