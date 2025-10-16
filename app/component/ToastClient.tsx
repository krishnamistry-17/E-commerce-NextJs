"use client";

import dynamic from "next/dynamic";

// Load ToastContainer on the client only, and import CSS alongside
const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer),
  { ssr: false, loading: () => <div data-testid="toast-container" /> }
);

import "react-toastify/dist/ReactToastify.css";

export default function ToastClient() {
  return <ToastContainer data-testid="toast-container" />;
}
