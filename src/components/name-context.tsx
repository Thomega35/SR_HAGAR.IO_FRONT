"use client";
import { useState, useContext, createContext } from 'react';

const nameContext = createContext<{
    name: string;
    setName: (name: string) => void;
}>({
    name: "",
    setName: () => { },
});

export function useName() {
    return useContext(nameContext);
}

export function NameProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [name, setName] = useState<string>("Thomas_"+makeid(3));


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