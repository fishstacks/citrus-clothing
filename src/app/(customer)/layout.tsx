import React from 'react';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import Navbar from "./_components/Navbar";
import { Citrus, CitrusIcon } from 'lucide-react';
import { CartProvider } from './hooks/useCart';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CITRUS | Online fashion shop",
  description: "Generated by create next app"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <body className={cn('relative h-full font-sans antialiased', inter.className)}>
        <main className='relative flex flex-col min-h-screen'>
        <CartProvider>
          <Navbar/>
          <div className="flex-grow flex-1">{children}</div>
        </CartProvider>
        </main>
      </body>
    </html>
  );
}


