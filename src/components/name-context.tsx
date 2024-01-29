"use client"; // This is a client component 👈🏽
import { useState, useContext, useEffect, createContext } from 'react';

const nameContext = createContext<{
  name: string;
  setName: (name: string) => void;
}>({} as {
  name: string;
  setName: (name: string) => void;
});

export function useName() {
  return useContext(nameContext);
}

export function NameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [name, setName] = useState<string>("");

    useEffect(() => {
        // Generate random name only on the client side
        setName((Math.random() < 0.5 ? "Thomas_" : "Yazid_")+ makeid(5));
    }, []); // Empty dependency array ensures it runs only on mount

    return (
        <nameContext.Provider
            value={{
                name,
                setName,
            }}
        >
            {children}
        </nameContext.Provider>
    );
}

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}
