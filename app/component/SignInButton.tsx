//app/component/signinbutton.tsx
"use client";

import { signInWithGitHub } from "@/actions/auth";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInButton() {
  const [isPending, startTransition] = useTransition();

  const handleGithub = () => {
    startTransition(async () => {
      const result = await signInWithGitHub();
      if (result?.url) {
        window.location.href = result.url; 
      } else {
        console.error("GitHub login failed.");
      }
    });
  };

  return (
      <div className=" space-y-5">
        <button
          type="button"
          onClick={handleGithub}
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
      </div>
    </>
  );
}
