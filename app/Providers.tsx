"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import dynamic from "next/dynamic";

const ToastClient = dynamic(() => import("./component/ToastClient"), {
  ssr: false,
});

type ProvidersProps = {
  children: React.ReactNode;
};

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <Provider store={store}>
        {children}
        <ToastClient />
      </Provider>
    </SessionProvider>
  );
}
