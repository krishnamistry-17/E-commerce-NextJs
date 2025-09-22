"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInButton() {
  const { data: session } = useSession();

  return (
    <>
      <button
        type="button"
        onClick={() =>
          signIn("github", {
            callbackUrl: "/",
          })
        }
        className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700 flex items-center justify-center gap-[15px]"
      >
        Sign In with GitHub{" "}
        <span>
          <FaGithub />
        </span>
      </button>

      <button
        type="button"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
        className="w-full bg-shopbtn text-white py-2 rounded text-[16px] font-quick-bold-700 flex items-center justify-center gap-[15px]"
      >
        Sign In with Google{" "}
        <span>
          <FaGoogle />
        </span>
      </button>
    </>
  );
}
