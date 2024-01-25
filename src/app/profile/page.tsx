"use client"; // This is a client component 👈🏽

import { useName } from "~/components/name-context";
import Navbar from "../../components/navbar";
import { useState } from "react";

export default function HomePage() {
  const [form_name, setFormName] = useState("");
  const { name, setName } = useName();

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName(form_name);
  };

  return (
    <div className="bg-gradient-to-br from-red-400 via-yel low-400 to-purple-600">
      <main className="max-w-6xl mx-auto h-full">
        <Navbar></Navbar>
        <div className="flex min-h-screen flex-col items-center justify-center ">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              In game name : <span className="text-[hsl(280,100%,70%)]">{name}</span>
            </h1>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:gap-8 justify-center">
              <div>
                <form className="container flex flex-col items-center justify-center gap-12 " onSubmit={onFormSubmit}>
                  <label>
                    Enter your name:
                    <input
                      type="text"
                      value={form_name}
                      onChange={(e) => setFormName(e.target.value)}
                    />
                  </label>
                  <button type="submit" className="text-2xl font-bold bg-white p-3 shadow rounded-xl">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}