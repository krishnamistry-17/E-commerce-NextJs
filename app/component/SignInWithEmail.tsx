// app/component/SignInWithEmail.tsx
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInWithEmail() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError(result?.error);
    } else {
      setSubmitted(true);
    }

    if (submitted) {
      return (
        <p className="text-center text-green-600">
          A magic link has been sent to <strong>{email}</strong>. Please check
          your inbox.
        </p>
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600 text-center">{error}</p>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        required
        data-testid="email-input"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700"
      >
        Sign In with Magic Link
      </button>
    </form>
  );
}
