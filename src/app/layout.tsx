import "~/styles/globals.css";
import { NameProvider } from "~/components/name-context";

import { Inter } from "next/font/google";
import { type Metadata } from 'next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hagar.io",
  description: "VIENS LA OU JE TE HAGAR!",
}

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
