"use client"; // This is a client component 👈🏽

import Link from "next/link";
import { useName } from "~/components/name-context";
import Navbar from "../components/navbar";
import { useState } from "react";
import { Canvas } from "./canvas";
import { Game } from "~/lib/Game";

export default function HomePage() {
  const { name } = useName();
  const [game, setGame] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | undefined>(undefined);

  function handleGameStartStop(toStart: boolean) {
    if (toStart) {
      if (currentGame){
        currentGame.destroy();
      }
      setCurrentGame(Game.getInstanceOfGame(name, "red"));
      setGame(true);
    }
    else {
      if (currentGame){
        currentGame.destroy();
      }
      setCurrentGame(undefined);
      setGame(false);
    }
  }


  if (!game) {
    return (
      <div className="bg-gradient-to-br min-h-screen from-red-400 via-yel low-400 to-purple-600 h-full w-full">
        <Navbar>
          <button className="text-2xl font-bold bg-white p-3 shadow rounded-xl" onClick={() => handleGameStartStop(true)}>Start Game</button>
        </Navbar>
        <div className="flex  flex-col items-center justify-center ">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-10 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Hello <span className="text-[hsl(280,100%,70%)]">{name}</span>!
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href="https://github.com/Thomega35"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">Thomas Delapart →</h3>
                <div className="text-lg">
                  Young developer, passionate about new technologies and web
                </div>
              </Link>
              <Link
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href="https://github.com/Xacone"
                target="_blank"
              >
                <h3 className="text-2xl font-bold">Yazid Benjamaa →</h3>
                <div className="text-lg">
                  Young developer, passionate about new technologies and web
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gradient-to-br min-h-screen from-red-400 via-yel low-400 to-purple-600 h-full w-full flex flex-col">
        <Navbar>
          <button className="text-2xl font-bold bg-white p-3 shadow rounded-xl" onClick={() => handleGameStartStop(false)}>Stop Game</button>
        </Navbar>
        <Canvas gameProcess={currentGame!}></Canvas>
      </div>
    );
  }
}
