//Next Js
import type { Metadata } from "next";
import { Geist, Geist_Mono,Barlow } from "next/font/google";
// Global css
import "./globals.css";

//Theme Provider
import { ThemeProvider } from "next-themes";
//Import Clerk
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

//Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const barlowFont= Barlow({
  subsets:['latin'],
  weight:['500','700'],
  variable:'--font-barlow',
});
//Metadata
export const metadata: Metadata = {
  title: "E-com-louisa",
  description: "handmade egyptian products E-com",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${barlowFont.variable} antialiased`}
      >
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-left" />
        </ThemeProvider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
