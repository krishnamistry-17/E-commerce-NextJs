"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import Header from "../app/header/page";
import Footer from "./footer/page";
import { Provider } from "react-redux";
import { store } from "./pages/store";
import {
  footerfirst,
  footerheadings,
  footersecond,
  footerthird,
} from "@/data/product";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Provider store={store}>
            <Header />
            {children}
            <Footer
              footerfirst={footerfirst}
              footersecond={footersecond}
              footerthird={footerthird}
              footerheadings={footerheadings}
            />
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
