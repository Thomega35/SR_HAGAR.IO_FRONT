"use client";

import "~/styles/globals.css";
import { NameProvider } from "~/components/name-context";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NameProvider>
        <body className={`font-sans ${inter.variable}`}>{children}</body>
      </NameProvider>
    </html>
  );
}
