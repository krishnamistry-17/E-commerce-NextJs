"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "../app/header/page";
import Footer from "./footer/page";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import {
  footerfirst,
  footerheadings,
  footersecond,
  footerthird,
} from "@/data/product";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PersistGate } from "redux-persist/integration/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Elements stripe={stripePromise}>
              <Header />
              {children}
              <ToastContainer />
              <Footer
                footerfirst={footerfirst}
                footersecond={footersecond}
                footerthird={footerthird}
                footerheadings={footerheadings}
              />
            </Elements>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
