"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Thankyou = () => {
  const router = useRouter();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center bg-white px-6 py-12 text-center">
      <div className="bg-green-100 rounded-full p-6 mb-6">
        <FaCheckCircle className="text-green-600 w-10 h-10" />
      </div>

      <h1 className="text-4xl font-bold text-green-700 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 max-w-md mb-8">
        Your order has been successfully placed. We appreciate your business and
        will send you a confirmation email shortly.
      </p>

      <button
        onClick={() => router.push("/")}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-md shadow-md transition"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default Thankyou;
