"use client";

import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "../app/header/page";
import Footer from "./footer/page";
import { ToastContainer } from "react-toastify";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <SessionProvider>
          <Provider store={store}>
            <Elements stripe={stripePromise}>
              <Header />
              {children}
              <ToastContainer />
              <Footer />
            </Elements>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
