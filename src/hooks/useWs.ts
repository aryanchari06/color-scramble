"use client";

import { gameDataPayload } from "@/app/(app)/start-game/[gameId]/page";
import { ParamValue } from "next/dist/server/request/params";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket: any;
const useSocket = (roomId: ParamValue) => {
  const [gameData, setGameData] = useState<gameDataPayload | null>(null);
  const [scoreYou, setScoreYou] = useState(0);
  const [scoreOpp, setScoreOpp] = useState(0);

  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_WS_URL);

    socket.on("connect", () => {
      // console.log("SocketID:", socket);
      socket.emit("join-room", roomId);
      socket.on("new-user", (message: any) => {
        // console.log(message);
      });
    });

    socket.on("game-data", (data: gameDataPayload) => {
      setGameData(data);
    });

    socket.on("correct-answer", (data: any) => {
      // console.log("oncorrectas", data);
      if (data.user === socket.id)
        socket.emit("update-score", { user: socket.id });
    });

    socket.on("update-score", (data: any) => {
      // console.log(data);
      if (data.payload.user === socket.id) setScoreYou(data.payload.score);
      else setScoreOpp(data.payload.score);
    });

    socket.on("disconnect", () => {
      console.log("Socket disonnected");
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = (msg: any) => {
    if (socket && socket.connected)
      socket.emit(msg.event, { user: socket.id, message: "Correct answer" });
    else console.warn("Socket is not connected ");
  };
  return { gameData, sendMessage, scoreYou, scoreOpp };
};

export { useSocket };
