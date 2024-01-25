"use client"; // This is a client component 👈🏽

import Link from "next/link";
import { useName } from "~/components/name-context";
import Navbar from "../components/navbar";
import { useState } from "react";
import { Canvas } from "./canvas";

export default function HomePage() {
  const { name, setName } = useName();
  const [game, setGame] = useState(false);

  if (!game) {
    return (
      <div className="bg-gradient-to-br min-h-screen from-red-400 via-yel low-400 to-purple-600">
        <main className="max-w-6xl mx-auto h-full w-full">
          <Navbar></Navbar>
          <div className="flex  flex-col items-center justify-center ">
            <div className="container flex flex-col items-center justify-center gap-12 px-4 py-10 ">
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                Hello <span className="text-[hsl(280,100%,70%)]">{name}</span>!
              </h1>
              <button className="text-2xl font-bold bg-white p-3 shadow rounded-xl" onClick={() => setGame(true)}>Start Game</button>
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
        </main>
      </div>
    );
  }else{
    return (
      <div className="bg-gradient-to-br min-h-screen from-red-400 via-yel low-400 to-purple-600">
        <main className="max-w-6xl mx-auto h-full w-full">
          <Navbar></Navbar>
          <div className="flex  flex-col items-center justify-center ">
            <Canvas game={game} setGame={setGame} name={name} setName={setName}></Canvas>
          </div>
        </main>
      </div>
    );
  }
}
