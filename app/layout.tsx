"use client";

import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header from "../app/header/page";
import Footer from "./footer/page";
import { ToastContainer } from "react-toastify";
import {
  footerfirst,
  footerheadings,
  footersecond,
  footerthird,
} from "@/data/product";

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
        </SessionProvider>
      </body>
    </html>
  );
}
