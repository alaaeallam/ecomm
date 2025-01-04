//Next Js
import type { Metadata } from "next";
import { Geist, Geist_Mono,Barlow } from "next/font/google";
// Global css
import "./globals.css";

//Theme Provider
import { ThemeProvider } from "next-themes";
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
        </ThemeProvider>
        
      </body>
    </html>
  );
}
