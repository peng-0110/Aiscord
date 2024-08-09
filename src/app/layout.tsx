import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {GGSans} from "../../public/fonts/fonts";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
              rel="stylesheet"/>
        <link rel ="icon" href="/favicon.ico"/>
        <title>Aiscord</title>
    </head>
    <body className={`${GGSans.className} bg-primary text-primary-text`}>{children}</body>
    </html>
  );
}
